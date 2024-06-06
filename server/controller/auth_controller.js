import User from "../models/user_model.js";         // Import the User model from the user_model.js file
import bcryptjs from 'bcryptjs';                    // Import the bcryptjs library for password hashing
import { errorHandler } from "../utils/error.js";   // Import the custom error handler function

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
