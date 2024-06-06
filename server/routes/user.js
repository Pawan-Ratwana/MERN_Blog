// Import the Express module
import express from 'express';

// Create a new router object
const router = express.Router();

// Import the test function from the user controller
import { test } from '../controller/user_controller.js';

// Define a GET route for /test that uses the test function from the user controller
router.get('/test', test);

// Export the router as the default export
export default router;
