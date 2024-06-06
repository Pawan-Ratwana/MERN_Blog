import express from "express";
const app = express();
const port = 3000;
import mongoose from "mongoose";
import env from 'dotenv';
env.config();


const uri = process.env.BLOG_MONGODB_URI;
mongoose.connect(uri).then(() => {
    console.log("MognoDB is connected successfully")
}).catch((err) => {
    console.log("Error to connect with MongoDB", err)
});




app.listen(port, (err) => {
    if (err) {
        console.log("Error to running server ", err);
    }

    console.log(`Server is running on http://localhost:${port}`);
})