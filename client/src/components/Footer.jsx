import { Footer } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'
import {BsFacebook,BsInstagram,BsGithub } from 'react-icons/bs'

export default function FooterCom() {
  return (
    <Footer container className='border border-teal-500'>
     <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
            <div className="mt-5">
                <Link to='/' className='self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white select-none'>
                <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Preetal's</span>Blog
                </Link>
            </div>

            <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
                <div className="">
                    <Footer.Title title='Quick Links'/>

                    <Footer.LinkGroup col>
                        <Footer.Link href='/'  rel="noopener noreferrer">Home</Footer.Link>
                    </Footer.LinkGroup>

                    <Footer.LinkGroup col>
                        <Footer.Link href='/about'  rel='noopener noreferrer'>About</Footer.Link>
                    </Footer.LinkGroup>

                    <Footer.LinkGroup>
                        <Footer.Link href='/projects' rel='noopener noreferrer'>Projects</Footer.Link>
                    </Footer.LinkGroup>
                </div>

                <div className="">
                    <Footer.Title title='Follow us'/>

                    <Footer.LinkGroup>
                        <Footer.Link href='http://github.com' target='_blank' rel='noopener noreferrer'>Github</Footer.Link>
                    </Footer.LinkGroup>

                    <Footer.LinkGroup>
                    <Footer.Link href='http://instragram.com' target='_blank' rel='noopener noreferrer'>Instragram</Footer.Link>
                    </Footer.LinkGroup>
                </div>

                <div className="">
                    <Footer.Title title='Contact Us'/>
                    <Footer.LinkGroup>
                        <Footer.Link href='mailto:example.dev@gmail.com'>Send Email</Footer.Link>
                    </Footer.LinkGroup>

                    <Footer.LinkGroup>
                        <Footer.Link href='tel:9876543210'>Call Us</Footer.Link>
                    </Footer.LinkGroup>
                </div>
            </div>
        </div>
        <Footer.Divider/>
        <div className="w-full sm:flex sm:items-center sm:justify-between">
            <Footer.Copyright by='Preetal' year={new Date().getFullYear()}/>
            <div className="flex gap-6 sm-mt-0 mt-4 sm:justify-center">
                <Footer.Icon href='#' icon={BsFacebook}/>
                <Footer.Icon href='#' icon={BsInstagram}/>
                <Footer.Icon href='#' icon={BsGithub}/>
            </div>
        </div>
     </div>
    </Footer>
  )
}
