import User from "../models/user_model.js";         // Import the User model from the user_model.js file
import bcryptjs from 'bcryptjs';                    // Import the bcryptjs library for password hashing
import { errorHandler } from "../utils/error.js";   // Import the custom error handler function
import jwt from 'jsonwebtoken';

// Controller function for user signup
export const signup = async (req, res, next) => {
    try {
        // Extract username, email, and password from the request body
        const { username, email, password } = req.body;

        // Check if any of the fields are missing or empty
        if (!username || !email || !password || username === '' || email === '' || password === '') {
            // Pass an error handler middleware with a 400 status and a message indicating that "all fields are required"
            return next(errorHandler(400, "All fields are required"));
        }

        // Query the database to check if a user with the same username or email already exists
        const existingUser = await User.find({ $or: [{ username }, { email }] });

        // If an existing user is found, pass an error with a 400 status and a message indicating that the user already exists
        if (existingUser.length > 0) {
            // Pass an error handler middleware with a 400 status and a message indicating that "User already exists"
            return next(errorHandler(400, "User already exists"));
        }

        // Hash the password using bcryptjs
        const hashedPassword = bcryptjs.hashSync(password, 10);

        // Create a new User instance with the provided username, email, and hashed password
        const newUser = new User({ username, email, password: hashedPassword });

        // Save the new user to the database
        await newUser.save();

        // Return a 201 status with a JSON response indicating that signup was successful
        return res.status(201).json({ message: "Sign up successful" });
    } catch (err) {
        // Pass any errors that occur during the process to the next middleware for handling
        next(err);
    }
};


// Sign in a user with either email or username and password
export const signin = async (req, res, next) => {
    const { identifier, password } = req.body;

    // Validate that identifier and password are provided
    if (!identifier || !password || identifier === '' || password === '') {
        next(errorHandler(400, "All Fields are required"));
    }

    try {
        // Find the user by email or username
        const validUser = await User.findOne({
            $or: [{ email: identifier }, { username: identifier }]
        });

        // If user is not found, return an error
        if (!validUser) {
            return next(errorHandler(400, "Invalid username/password"));
        }

        // Check if the password is valid
        const validPassword = bcryptjs.compareSync(password, validUser.password);

        // If the password is invalid, return an error
        if (!validPassword) {
            return next(errorHandler(400, "Invalid username/password"));
        }

        // Generate a JWT token
        const token = jwt.sign({ id: validUser._id }, process.env.BLOG_JWT_SECRET, { expiresIn: "1h" });

        // Exclude the password from the user object before sending the response
        const { password: pass, ...rest } = validUser._doc;

        // Set the token in an HTTP-only cookie
        res.status(200).cookie('access_token', token, {
            httpOnly: true, // Prevents JavaScript from accessing the cookie (mitigates XSS attacks)
            // secure: process.env.NODE_ENV === 'production', // Ensures the cookie is only sent over HTTPS in production
            sameSite: 'strict' // Prevents the cookie from being sent in cross-site requests (mitigates CSRF attacks)
        }).json(rest);

    } catch (err) {
        // Handle any unexpected errors
        next(err);
    }
};