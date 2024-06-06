import express from "express";
const app = express();
const port = 3000;




app.listen(port, (err) => {
    if (err) {
        console.log("Error to running server ", err);
    }

    console.log(`Server is running on http://localhost:${port}`);
})