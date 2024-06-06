// Creates a custom error object with a specified status code and message.
export const errorHandler = (statusCode, message) => {
    // Create a new Error object
    const error = new Error();

    // Assign the provided status code to the error object
    error.statusCode = statusCode;

    // Assign the provided message to the error object
    error.message = message;

    // Return the custom error object
    return error;
};


