// Import React library to use JSX syntax and React features
import React from 'react';
// Import Button, Navbar, and TextInput components from Flowbite React library
import { Button, Navbar, TextInput } from 'flowbite-react';
// Import Link and useLocation hook from react-router-dom for navigation and accessing location
import { Link, useLocation } from 'react-router-dom';
// Import search and moon icons from react-icons
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon } from 'react-icons/fa';

// Define a functional component called Header
export default function Header() {
  // Get the current path using useLocation hook
  const path = useLocation().pathname;

  return (
    // Navbar component with a bottom border
    <Navbar className='border-b-2'>

      {/* Logo and blog name with a gradient background */}
      <Link to='/' className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white select-none'>
        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Preetal's</span>Blog
      </Link>

      {/* Search form, hidden on small screens */}
      <form>
        <TextInput type='text' placeholder='Search...' rightIcon={AiOutlineSearch} className='hidden lg:inline'></TextInput>
      </form>

      {/* Search button, visible on small screens */}
      <Button className='w-12 h-10 lg:hidden' color='gray' pill>
        <AiOutlineSearch />
      </Button>

      {/* Container for moonlight toggle and sign-in button, ordered for medium screens */}
      <div className='flex gap-2 md:order-2'>

        {/* Moonlight toggle button, hidden on small screens */}
        <Button className='w-12 h-10 hidden sm:inline' color='gray' pill>
          <FaMoon />
        </Button>

        {/* Sign-in button */}
        <Link to='/sign-in'>
          <Button className='' gradientDuoTone='purpleToBlue'outline>Sign In</Button>
        </Link>

        {/* Navbar toggle button */}
        <Navbar.Toggle />
      </div>

      {/* Collapsible navbar section */}
      <Navbar.Collapse>

        {/* Home link with active state based on current path */}
        <Navbar.Link active={path === "/"} as='div'>
          <Link to='/'>Home</Link>
        </Navbar.Link>

        {/* About link with active state based on current path */}
        <Navbar.Link active={path === "/about"} as='div'>
          <Link to='/about'>About</Link>
        </Navbar.Link>

        {/* Projects link with active state based on current path */}
        <Navbar.Link active={path === "/projects"} as='div'>
          <Link to='/projects'>Projects</Link>
        </Navbar.Link>

      </Navbar.Collapse>

    </Navbar>
  )
}
