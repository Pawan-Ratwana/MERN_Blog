import User from "../models/user_model.js";         // Import the User model from the user_model.js file
import bcryptjs from 'bcryptjs';                    // Import the bcryptjs library for password hashing

// Controller function for user signup
export const signup = async (req, res) => {
    try {
        // Extract username, email, and password from the request body
        const { username, email, password } = req.body;

        // Check if any of the fields are missing or empty
        if (!username || !email || !password || username === '' || email === '' || password === '') {
            // Return a 400 status with a JSON response indicating that all fields are required
            return res.status(400).json({ message: "All fields are required" });
        } else {

            // Query the database to check if a user with the same username or email already exists
            const existingUser = await User.find({ $or: [{ username, email }] });

            // If an existing user is found, return a 400 status with a JSON response indicating that the user already exists
            if (existingUser.length > 0) {
                console.log("User already exists: ", existingUser);
                return res.status(400).json({ message: "User already exists" })
            }


            // Hash the password using bcryptjs
            const hashedPassword = bcryptjs.hashSync(password, 10);

            // Create a new User instance with the provided username, email, and hashed password
            let newUser = new User({ username, email, password: hashedPassword });
            // Save the new user to the database
            await newUser.save();
            // Return a 201 status with a JSON response indicating that signup was successful
            return res.status(201).json({ message: "Sign up successful" });
        }
    } catch (err) {
        // Handle errors
        console.log("Error signing up the user: ", err);
        // Return a 500 status with a JSON response indicating the error
        return res.status(500).json("Error signing up the user: ", err.message)
    }
}
