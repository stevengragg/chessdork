import React from 'react'

 const Tooltip = ({message}) => {
    return (
        <div className="group-hover:visible visible absolute z-10 w-36 text-center bottom-full left-1/2 transform -translate-x-1/2">
        <div className="relative mx-2">
          <div className="bg-blueGray-800  text-white text-xs rounded py-1 px-4 right-0 bottom-full">
            {message? message : "i'm a tooltip"}
            <svg className="absolute h-3 w-full left-0 top-full" viewBox="0 0 255 255"><polygon points="0,0 127.5,127.5 255,0"/></svg>
          </div>
        </div>
      </div>
    )
}
export default Tooltip