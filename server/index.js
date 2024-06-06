import express from "express";
const app = express();
const port = 3000;
import mongoose from "mongoose";
import env from 'dotenv';
import apiRoutes from './routes/api.js';
app.use(express.urlencoded({ extended: true }));
app.use(express.json())


env.config();


const uri = process.env.BLOG_MONGODB_URI;
mongoose.connect(uri).then(() => {
    console.log("MognoDB is connected successfully")
}).catch((err) => {
    console.log("Error to connect with MongoDB", err)
});


app.use('/api/', apiRoutes);

// Error-handling middleware for Express  ||  add middleware to handle error
app.use((err, req, res, next) => {
    // Set the status code, defaulting to 500 if not provided
    const statusCode = err.statusCode || 500;
    // Set the error message, defaulting to "Internal Server Error" if not provided
    const message = err.message || "Internal Server Error";

    // Log the error for debugging purposes
    console.error(`Error: ${message}, Status Code: ${statusCode}`, err);

    // Respond with the error status code and a JSON object containing the error details
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});


app.listen(port, (err) => {
    if (err) {
        console.log("Error to running server ", err);
    }

    console.log(`Server is running on http://localhost:${port}`);
})


