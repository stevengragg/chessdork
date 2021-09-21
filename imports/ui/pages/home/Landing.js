import React, { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import ChessDorkForSchools from "./ChessDorkForSchools"
import {Link } from "react-router-dom"

const navigation = [

]

export default function Example() {
    const handleLoginWithGoogle = ()=>
    {
        Meteor.loginWithGoogle({
            requestPermissions: [ 'email']
          }, (err) => {
            if (err) {
              // handle error
              console.log ({err})
            } else {
              // successful login!
              console.log ("SUCCESS!!!")
            }
          });
    }
  return (
    <div className="min-h-screen">
      <div className="relative overflow-hidden">
        <Popover as="header" className="relative">
          {({ open }) => (
            <>
              <div className="  bg-gradient-to-r from-blueGray-800 to-gray-900 pt-6">
                <nav
                  className="relative max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6"
                  aria-label="Global"
                >
                  <div className="flex items-center flex-1">
                    <div className="flex items-center justify-between w-full md:w-auto">
                    <Link to={"/"} className="text-xl ">

<img className={` ${false && "animate-wiggle"}  h-16 lg:h-24 w-24 lg:w-32 text-white`} src={"/logo/chessDorkWhite.svg"} />
</Link>

                      <div className="-mr-2 flex items-center md:hidden">
                        <Popover.Button className="bg-gradient-to-r from-blueGray-800 to-gray-900 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-800 focus:outline-none focus:ring-2 focus-ring-inset focus:ring-white">
                          <span className="sr-only">Open main menu</span>
                          <MenuIcon className="h-6 w-6" aria-hidden="true" />
                        </Popover.Button>
                      </div>
                    </div>
                    <div className="hidden space-x-8 md:flex md:ml-10">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="text-base font-medium text-white hover:text-gray-300"
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                  <div className="hidden md:flex md:items-center md:space-x-6">
                    <a href="#" className="text-base font-medium text-white hover:text-gray-300">
                      Log in
                    </a>
                    <a
                      href="#"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700"
                    >
                      Start free trial
                    </a>
                  </div>
                </nav>
              </div>

              <Transition
                show={open}
                as={Fragment}
                enter="duration-150 ease-out"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="duration-100 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Popover.Panel focus static className="absolute top-0 inset-x-0 p-2 transition transform origin-top md:hidden"
                >
                  <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
                    <div className="px-5 pt-4 flex items-center justify-between">
                      <div>
                        <img
                          className="h-8 w-auto"
                          src="https://tailwindui.com/img/logos/workflow-mark-teal-600.svg"
                          alt=""
                        />
                      </div>
                      <div className="-mr-2">
                        <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-600">
                          <span className="sr-only">Close menu</span>
                          <XIcon className="h-6 w-6" aria-hidden="true" />
                        </Popover.Button>
                      </div>
                    </div>
                    <div className="pt-5 pb-6">
                      <div className="px-2 space-y-1">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                      <div className="mt-6 px-5">
                        <button
                        onClick={()=>handleLoginWithGoogle()}
                        className="block text-center w-full py-3 px-4 rounded-md shadow bg-teal-600 text-white font-medium hover:bg-teal-700"
                        >
                          START
                        </button>
                      </div>
                      <div className="mt-6 px-5">
                        <p className="text-center text-base font-medium text-gray-500">
                          Existing customer?{' '}
                          <a href="#" className="text-gray-900 hover:underline">
                            Login
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>

        <main>
          <div className="pt-10 bg-gradient-to-r from-blueGray-800 to-gray-900    sm:pt-16 lg:pt-8 lg:pb-14 lg:overflow-hidden">
            <div className="mx-auto max-w-7xl lg:px-8">
              <div className="lg:grid lg:grid-cols-2 lg:gap-8">
                <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center">
                  <div className="lg:py-24">
                 
                    <h1 className="mt-4 text-4xl tracking-tight font-extrabold text-white sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl">
                      <span className="block">A fun way to</span>
                      <span className="block text-teal-600">become better at chess</span>
                    </h1>
                    <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                    Get better at chess with our master content and spaced repetition tech 
                    </p>
                    <div className="mt-10 sm:mt-12">
                      <form action="#" className="sm:max-w-xl sm:mx-auto lg:mx-0">
                        <div className="sm:flex">
                          
                          <div className="mt-3 sm:mt-0 ">
                            <button
                            onClick={()=>handleLoginWithGoogle()}
                              className=" text-xl block w-full py-3 px-4 rounded-md shadow bg-teal-500 text-white font-medium hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-300 focus:ring-offset-gray-900"
                            >
                                    GET STARTED
                            </button>
                            {/* <Link to="/welcome" >GET STARTED</Link>  */}
                          </div>
                        </div>
                       
                      </form>
                    </div>
                  </div>
                </div>
                <div className=" mt-16 h-full">
                  <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6  lg:px-0">
                    <img
                      className="rounded-md h-80 lg:h-96 lg:inset-y-0 lg:left-0  lg:w-auto "
                      src={"img/chessPieces.svg"}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>


                            <ChessDorkForSchools/>
{/* 
                            <div>

                                PRICING
                            </div> */}


                            {/* SECCION EXPLICAR QUÉ ES */}
          {/* More main page content here... */}
        </main>
      </div>
    </div>
  )
}

    