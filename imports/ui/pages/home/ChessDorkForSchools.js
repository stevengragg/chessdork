/* This example requires Tailwind CSS v2.0+ */
import React from "react"
export default function Example() {
  return (
    <div className="flex bg-gradient-to-r from-blueGray-800 to-gray-900">
      <div className="h-56  my-auto m-auto bg-blueGray-100 sm:h-72 md:absolute md:left-0 md:h-full md:w-1/3">
        <img className=" object-cover" src={"img/rookBackpack.svg"} alt=""
        />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="md:ml-auto md:w-2/3 md:pl-10">
          <h2 className="text-base font-semibold uppercase tracking-wider text-gray-300">Chessdork for chess programs</h2>
          <p className="mt-2 text-white text-3xl font-extrabold tracking-tight sm:text-4xl">Are you a chess coach?</p>
          <p className="mt-3 text-lg text-gray-300">
                Chessdork is a great complement for ambitious chess programs. It helps you guide your students and track their progress in different areas of the game! 
          </p>
          <div className="mt-8">
            <div className="inline-flex rounded-md shadow">
              <a
                href="#"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-gray-900 bg-white hover:bg-gray-50"
              >
                Use Chessdork with your students
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
