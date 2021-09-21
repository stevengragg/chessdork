import React from 'react'
import { ProgressBar } from './ProgressBar';
import {  Link , useHistory, useParams} from "react-router-dom";
import { useMoveViewerStore } from "../../../hooks/useMoveViewerStore"

export const CongratulateScreen = () => {
    const history = useHistory()
    const setSuccess = useMoveViewerStore(state => state.setSuccess)
    const params = useParams()
    const handleContinue = ()=>{
        setSuccess(false)
        history.push("/learn")
    }
    const handleReview = ()=>{
        setSuccess(false)
        history.push(`/show/${params.openingId}/${params.levelId}/${params.lessonId}`)
    }
    return (
        <div className="h-screen ">

            <div className="flex flex-col h-full items-center justify-center">
                {/* <Confetti/> */}
                <img className="  h-64 lg:mt-2 mb-6 lg:mb-10 lg:h-64 lg:w-64 w-64" src={`/images/queenz.svg`} />
                <ProgressBar progress={20} />
                <span className="font-black lg:text-xl text-lg"> You are 4 exp from reaching your daily goal</span>

                <div className="mt-12 w-full mx-12 flex justify-around">
                    <button onClick={()=>handleReview()} className="text-xl block  py-3 px-4 rounded-md shadow bg-gray-300 text-white font-medium hover:bg-gray-400 
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 focus:ring-offset-gray-900">REVIEW MOVES</button>


                        <button onClick={()=>handleContinue()} className="text-xl block  py-3 px-4 rounded-md shadow bg-teal-500 text-white font-medium hover:bg-teal-600 
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-300 focus:ring-offset-gray-900">
                            CONTINUE</button>
                </div>
            </div>

        </div>
    )
}
