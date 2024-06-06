// Importing necessary components and libraries
import { Button, Label, TextInput } from 'flowbite-react'; // Importing necessary components from flowbite-react library
import React from 'react';                                 // Importing React library
import { Link } from 'react-router-dom';                   // Importing Link component from react-router-dom library

// SignUp functional component
function SignUp() {
  return (
    // Main container with minimum height and top margin
    <div className='min-h-screen mt-20'>
      {/* Flex container for layout */}
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-cnter gap-6">
        {/* Left section */}
        <div className="flex-1">
          {/* Logo and blog name */}
          <Link to='/' className='text-3xl font-bold dark:text-white'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Preetal's</span>Blog
          </Link>
          
          {/* Introduction text */}
          <p className='text-lg text-justify mt-5 text-gray-700'>Welcome to Preetal's Blog – your gateway to inspiration and connection! Elevate your online experience by becoming part of our thriving community. Whether you choose the traditional path of email and password sign-up or opt for the seamless Google registration, your entry into a world of meaningful content and engaging discussions awaits.</p>
        </div>
        
        {/* Right section */}
        <div className="flex-1">
          {/* Sign-up form */}
          <form className='flex flex-col gap-4 '>

              {/* Username input */}
              <div className="">
                <Label value='Your username'/>
                <TextInput type='text' placeholder='username' id='username'/>
              </div>

              {/* Email input */}
              <div className="">
                <Label value='Your email' />
                <TextInput type='email' placeholder='preetal@gmail.com' id='email'/>
              </div>

              {/* Password input */}
              <div className="">
                <Label value='Your Password' />
                <TextInput type='password' placeholder='password' id='password'/>
              </div>

              {/* Sign up button */}
              <Button gradientDuoTone='purpleToPink' type='submit'>Sign Up</Button>

          </form>

          {/* Sign in link */}
          <div className="flex gap-2 text-sm mt-5 ">
            <span className='font-semibold text-gray-700'>Have an account?</span>
            <Link to='/sign-in' className='text-blue-500 underline '>Sign in</Link>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default SignUp; // Exporting SignUp component as default
