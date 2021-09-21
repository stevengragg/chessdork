import React, { useState, useEffect } from 'react'
import { useParams, Link, useHistory } from "react-router-dom";
import Nav from "../../components/nav/Nav"
import { useTracker } from 'meteor/react-meteor-data'
import useVariations from "../../hooks/useVariations"
import useCourse from '../../hooks/useCourse';
import useHover from 'react-use-hover';
import Tooltip from "../../components/common/Tooltip"
import Variation from "./Variation"

export default VariationList = () => {
    const history = useHistory()
    const params = useParams()
    const [isHovering, hoverProps] = useHover();
    const [isHoveringDumbbell, hoverDumbbellprops] = useHover();

    const { currentOpening, currentLesson, variations, isLoading } = useVariations({ lessonId: params.lessonId, openingId: params.openingId, level: parseInt(params.levelId.slice(-1)) })
    const handleGoToView = () => {
        console.log ("hOLAAAA")
        history.push(`/show/${params.openingId}/${params.levelId}/${currentLesson.lessonId}`)
    }
    console.log({ currentLesson })
    const handleGoToVariation = ({ variationId }) => {
        history.push(`/practice/${params.openingId}/${params.levelId}/${currentLesson.lessonId}/${variationId}`)
    }
    const handleShowVariation = ({ variationId }) => {
        history.push(`/show/${params.openingId}/${params.levelId}/${currentLesson.lessonId}/${variationId}`)
    }
    const handleGoToChapters = ()=>{
        history.push(`/chapters/${params.openingId}/${params.levelId}/`)

    }
    return (
        <div>
            <Nav />
            <div className="mx-auto   ">
                <div className="bg-blueGray-50  py-12">
                    {isLoading ?
                        <div></div>
                        :
                        <div className="flex flex-col items-center justify-center">
                            <div className="mb-2 w-3/4 lg:w-2/3 ">

                                {currentOpening && currentOpening.length > 0 && <h2 className="w-full  text-2xl lg:text-3xl mb-4 font-black">{currentOpening[0].name} {" "} </h2>}

                                {currentLesson && <h2 onClick={handleGoToView} className="cursor-pointer text-xl lg:text-2xl  font-black">{currentLesson.name} ({currentLesson.variationsFinished.length}/{currentLesson.variations.length})</h2>}
                                {<p onClick={handleGoToChapters} className="cursor-pointer text-amber-600 my-2 text-sm">Go to chapters</p>}
                            </div>
                            <>
                                {variations && variations.map((variation, i) => {
                                    return (
                                        <Variation variation={variation} i={i} handleGoToVariation={handleGoToVariation} handleShowVariation={handleShowVariation}/>
                                      
                                    )
                                })}
                            </>
                        </div>
                    }
                </div>

            </div>
        </div>
    )
}
