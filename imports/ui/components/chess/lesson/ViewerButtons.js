import React from 'react'
import { useMoveViewerStore } from "../../../hooks/useMoveViewerStore"
import useSound from 'use-sound';
import useHover from 'react-use-hover';

const ViewerButtons = () => {
    const [isHovering, hoverProps] = useHover();

    const next = useMoveViewerStore(state => state.next)
    const back = useMoveViewerStore(state => state.back)
    const last = useMoveViewerStore(state => state.last)
    const first = useMoveViewerStore(state => state.first)
    const setLessonMode = useMoveViewerStore(state => state.setLessonMode)
    const [playSound] = useSound("/sounds/move.mp3", { volume: 0.5 })

    return (
        <div className="flex w-100 justify-center space-x-5 my-1">
            {/* <div onClick={() => setLessonMode("practice")} {...hoverProps} className="px-2 py-2  text-black  hover:bg-teal-600 hover:text-white rounded-lg" >
                {isHovering ?
                    <img className="  h-6 lg:mt-2  lg:h-6 lg:w-6 w-6" src={`/images/dumbbellWhite.svg`} /> :
                    <img className="  h-6 lg:mt-2  lg:h-6 lg:w-6 w-6" src={`/images/dumbbell.svg`} />}
           </div> */}
           
                     {/* <img onClick={() => setLessonMode("practice")} className=" cursor-pointer h-6 lg:mt-2  lg:h-6 lg:w-6 w-6" src={`/images/dumbbell.svg`} /> */}
         
            <div className="hover:text-white px-4 py-2 hover:bg-teal-600 focus:bg-teal-400 cursor-pointer rounded-md hover:shadow-lg" onClick={() => first()}>

                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                </svg>

            </div>

            <div className="px-4 py-2 hover:text-white hover:bg-teal-600 focus:bg-teal-400 cursor-pointer rounded-md hover:shadow-lg" onClick={() => back(playSound)}>

                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path className="stroke-current hover:text-white" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </div>
            <div className="px-4 py-2 hover:text-white hover:bg-teal-600 focus:bg-teal-400 cursor-pointer rounded-md hover:shadow-lg" onClick={() => next(playSound)}>

                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path className="stroke-current " strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </div>
            <div className="px-4 py-2  hover:text-white hover:bg-teal-600 focus:bg-teal-400 cursor-pointer rounded-md hover:shadow-lg" onClick={() => last()}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path className="stroke-current  " strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
            </div>

        </div>
    )
}
export default ViewerButtons