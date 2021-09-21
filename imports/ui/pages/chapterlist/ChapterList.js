import React from 'react'
import { useParams, Link, useHistory } from "react-router-dom";
import Nav from "../../components/nav/Nav"
import { useTracker } from 'meteor/react-meteor-data'
import useOpening from "../../hooks/useOpening"
import useCourse from "../../hooks/useCourse"
import useVariations from '../../hooks/useVariations';

export default ChapterList = () => {
    const history = useHistory()
    const params = useParams()
    const { currentOpening,currentLevel, isLoading } = useVariations({ openingId: params.openingId, level: parseInt(params.levelId.slice(-1)) })
    const handleGoToView = ({lessonId}) => {
        history.push(`/show/${params.openingId}/${params.levelId}/${lessonId}`)
    }
    const handleGoToVariationsList = ({ lessonId }) => {
        history.push(`/chapters/${params.openingId}/${params.levelId}/${lessonId}/variations`)
    }
    console.log({currentLevel})
    return (
        <div>
            <Nav />
            <div className="mx-auto   ">
                <div className="bg-blueGray-50 h-screen py-12">
                    {isLoading ?
                        <div></div>
                        :
                        <div className="flex flex-col items-center justify-center">
                                                                <div className="mb-4 w-3/4 lg:w-2/3 ">

                            {currentOpening && currentLevel &&currentOpening.length > 0 &&  <h2  className="w-full  text-2xl lg:text-3xl  font-black">{currentOpening[0].name} {" "}
                            ({currentLevel.variationsFinished.length}/{currentLevel.variationIds.length})</h2>}
                            </div>
                           
                            {currentOpening && currentLevel && currentOpening.length > 0 && currentOpening[0].lessons && currentOpening[0].lessons.map((lesson,i) => {
                                return (
                                    <div className="bg-white shadow-md rounded-lg p-4 my-4 w-3/4 lg:w-2/3 ">
                                        <h2 onClick={()=>handleGoToView({lessonId: lesson.lessonId})} className="cursor-pointer text-xl lg:text-2xl  font-black">{lesson.name} ({currentLevel.lessons[i].variationsFinished.length}/{currentLevel.lessons[i].variations.length})</h2>
                                        <div className="flex mt-4 justify-between">
                                            <span className=" text-amber-600  cursor-pointer " onClick={() => handleGoToVariationsList({ lessonId: lesson.lessonId })}>Practice</span>
                                        </div>
                                    </div>
                                )

                            })}
                        </div>
                    }
                </div>

            </div>
        </div>
    )
}
