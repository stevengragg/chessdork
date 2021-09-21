import React from 'react'

export const ProgressBar = ({progress}) => {
    return (
        <div class=" w-3/5 pt-1  ">
            <div class="overflow-hidden h-3 mb-4 text-xs flex rounded bg-amber-100">
                <div style={{ width: `${progress}%` }} class="bg-gradient-to-r  shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-amber-400"></div>

            </div>
        </div>
    )
}
