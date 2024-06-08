// Importing necessary components and libraries
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'; // Importing necessary components from flowbite-react library
import React, { useState } from 'react';                                 // Importing React library
import { Link, useNavigate } from 'react-router-dom';                   // Importing Link component from react-router-dom library

function SignIn() {
  // State variables for form data, error message, loading state, and navigation
  const [formData, setFormData] = useState({});         // State for form data
  const [errorMessage, setErrorMessage] = useState(null); // State for error message
  const [loading, setLoading] = useState(false);          // State for loading state
  const navigate = useNavigate();                         // Function to navigate between routes

  // Function to handle changes in form inputs
  const handleChange = async (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() }); // Update form data
    setErrorMessage(null); // Clear error message on input change
  }

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Check if any of the required fields are empty
    if (!formData.identifier || !formData.password) {
      return setErrorMessage('Please fill out all fields.'); // Display error message if any field is empty
    }

    try {
      setLoading(true); // Set loading state to true
      setErrorMessage(null); // Clear any existing error message

      // Send a POST request to the server with form data
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      // Parse the response JSON
      const data = await res.json();

      // Check if the server request was not successful
      if (data.success === false) {
        return setErrorMessage(data.message); // Display error message returned from the server
      }

      // If the server request was successful, navigate to the sign-in page
      navigate('/');

    } catch (err) {
      setErrorMessage('Something went wrong. Please try again later.'); // Display generic error message
    } finally {
      setLoading(false); // Set loading state to false after request completes
    }
  }

  // JSX markup for the sign-up form
  return (
    // Main container with minimum height and top margin
    <div className='min-h-screen mt-20'>
      {/* Flex container for layout */}
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-6">
        {/* Left section */}
        <div className="flex-1">
          {/* Logo and blog name */}
          <Link to='/' className='text-3xl font-bold dark:text-white'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Preetal's</span>Blog
          </Link>
          
          {/* Introduction text */}
          <p className='text-lg text-justify mt-5 text-gray-700'>Welcome back! To access your account, simply enter your username or email along with your password below. If you're unsure, no worries! Just enter the information you remember, and we'll take care of the rest.</p>
        </div>
        
        {/* Right section */}
        <div className="flex-1">
          {/* Sign-up form */}
          <form className='flex flex-col gap-4 ' onSubmit={handleSubmit}>
              {/* Email input */}
              <div className="">
                <Label htmlFor='identifier' value='Username or Email' />
                <TextInput type='text' placeholder='preetal@gmail.com OR preetal' id='identifier' value={formData.identifier} onChange={handleChange} required/>
              </div>
              {/* Password input */}
              <div className="">
                <Label htmlFor='password' value='Your Password' />
                <TextInput type='password' placeholder='password' id='password' value={formData.password} onChange={handleChange} required/>
              </div>
              {/* Error message display */}
              {errorMessage && (
                <Alert color='failure' aria-live="polite">
                  {errorMessage}
                </Alert>
              )}
              {/* Sign up button with loading spinner */}
              <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading ||errorMessage}>
                {loading ? (
                  <>
                    <Spinner size='sm'/>
                    <span className='pl-3'>Loading...</span>
                  </>
                ) : 'Sign In'}
              </Button>
          </form>
          {/* Sign in link */}
          <div className="flex gap-2 text-sm mt-5 ">
            <span className='font-semibold text-gray-700'>Don't have an account?</span>
            <Link to='/sign-up' className='text-blue-500 underline '>Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
