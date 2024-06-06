// Define and export the test function
// This function handles a GET request to the /test endpoint
export const test = (req, res) => {
    // Send a JSON response with a message
    res.json({ message: "Jai Shree Ram from api using controller" });
};