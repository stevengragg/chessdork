import React , {useState, useEffect} from 'react'
import { Link } from "react-router-dom"

export const LessonMenu = ({ level }) => {
    console.log ({level})
    const [nextVariationId, setNextVariationId] = useState()
    const [nextLessonId, setNextLessonId] = useState()
    useEffect(() => {
        let firstTry  = true 
        if (level){

            for (let lesson of level.lessons){
                
               if (lesson.finished===false ){

                for (let variation of lesson.variations){
                    if (variation.finished===false){
                        setNextVariationId(variation.variationId)
                        setNextLessonId(lesson.lessonId)
                        console.log ("NEXT UP ARE ", lesson.lessonId, variation.variationId )
                        break
                    }
                }
                break
               }
           }
        }
    }, [level])
    return (
        <div className="relative ">
            <div style={{ position: "absolute", left: "-120%" }} className={`  w-64 md:w-72 lg:w-80 ${level.active === false ? "bg-gray-100 ring-2 ring-blueGray-500" : level.orientation === "white" ? "bg-amber-400" : "bg-teal-500"}   text-white px-4 py-4 origin-top-right absolute right-0 mt-14  rounded-md shadow-lg  ring-1 ring-black ring-opacity-5  focus:outline-none`} role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                {

                    level.active ?
                        <div>
                            <div className="flex justify-between w-100 ">
                                <div>
                                    <p className="text-md font-semibold"> Mastery 1/3</p>
                                </div>
                            </div>

                            <div className="mt-3 w-100">

                                <Link to={`/chapters/${level.openingId}/${level.levelId}/`}

                                    className={`focus:outline-none font-bold bg-white w-full ${level.orientation === "white" ? "text-amber-400 hover:text-amber-300" : "text-teal-500 hover:text-teal-400"}   w-100 px-6 py-2 rounded-lg shadow-lg cursor-pointer flex justify-center`}>
                                    <div className="flex space-x-2 justify-center" >
                                        <span>

                                        LEARN
                                        </span>
                                        {/* <img className="  h-6 lg:mt-2  lg:h-8 lg:w-8 w-6" src={`/images/glasses.svg`} /> */}

                                        </div >
                                </Link>
                            </div>
                            <div className="mt-3 w-100">
                                <Link className="w-full" to={`/practice/${level.openingId}/${level.levelId}/${nextLessonId}/${nextVariationId}`}>
                                    
                                    
                                    <button className={`focus:outline-none font-bold bg-white w-full ${level.orientation === "white" ?
                                     "text-amber-400 hover:text-amber-300" : "text-teal-500 hover:text-teal-400"}  
                                     w-100 px-6 py-2 rounded-lg shadow-lg cursor-pointer flex justify-center`} >
                                         PRACTICE NEXT VARIATION
                                         {/* <img className="  h-6 lg:mt-2  lg:h-8 lg:w-8 w-6" src={`/images/dumbbell.svg`} /> */}

                                    </button >
                                </Link>
                            </div>
                            {/* <div className="mt-3 w-100">
                                <Link className={`${level.orientation === "white" ? "bg-amber-400 ring-amber-800" : "bg-teal-500 ring-blueGray-200"}  ring-2  text-white w-100 px-6 py-2 rounded-lg  cursor-pointer flex justify-center`} to={`/learn/${level.openingId}/tips`}>
                                    <div  >
                                        SAMPLE GAMES
                    </div >
                                </Link>
                            </div> */}
                        </div> :
                        <div>
                            <div className="text-center text-gray-400">
                                <span>Reach Mastery Level 2 in  previous lessons to open this one!</span>
                                {/* <span>Complete 50% of the variations in previous lessons to open this one! </span> */}
                                <div className="mt-3 w-100">
                                    <div className={` bg-blueGray-300  ring-2  text-white w-100 px-6 py-2 rounded-lg  cursor-pointer flex justify-center`} >
                                        <div  >
                                            LOCKED
                    </div >
                                    </div>
                                </div>
                            </div>

                        </div>

                }
            </div>
        </div>
    )
}
