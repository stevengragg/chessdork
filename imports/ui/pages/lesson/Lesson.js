import React, { useRef, useState } from 'react'
import { useParams, useHistory, Link } from "react-router-dom";
import { useTracker } from 'meteor/react-meteor-data'
import MoveViewer from "../../components/chess/lesson/MoveViewer"
import { ProgressBar } from '../../components/chess/lesson/ProgressBar';
import { useMoveViewerStore } from "../../hooks/useMoveViewerStore"
import useOpening from "../../hooks/useOpening"
import useChessGameView from "../../hooks/useChessGameView"
import { XIcon } from '@heroicons/react/outline'
import useHover from 'react-use-hover';
import Tooltip from "../../components/common/Tooltip"
import Nav from "../../components/nav/Nav"
import { CongratulateScreen } from '../../components/chess/lesson/CongratulateScreen';
import VariationList from '../variations/VariationList';
import { Modal } from '../../components/common/Modal';
import useClickOutside from "../../hooks/useClickOutside"

/* 
 Lesson  Component
If the user is logged in and has the corresponding lesson, load data (pgn, etc)
If not, redirect to home  (or show a 404 lesson not found)

For now, we will return the whole level 
*/
const Lesson = () => {
    const clickRef = useRef();
    useClickOutside(clickRef, () => { if (goToShowModal) setGoToShowModal(false) });
    const [goToShowModal, setGoToShowModal] = useState()
    const [isHovering, hoverProps] = useHover();
    const history = useHistory()
    const params = useParams()
    const user = useTracker(() => Meteor.user());
    const setLessonMode = useMoveViewerStore(state => state.setLessonMode)
    const isPractice = useMoveViewerStore(state => state.isPractice)
    const success = useMoveViewerStore(state => state.success)
    const lessonMode = useMoveViewerStore(state => state.lessonMode)
    const displayMoves = useMoveViewerStore(state => state.displayMoves)
    const currentVariation = useMoveViewerStore(state => state.currentVariation)
    const currentProgress = useMoveViewerStore(state => state.currentProgress)
    const handleSetCurrentVariation = useMoveViewerStore(state => state.handleSetCurrentVariation)
    const variations = useMoveViewerStore(state => state.variations)
    const { currentOpening, isLoading } = useOpening({ openingId: params.openingId, level: parseInt(params.levelId.slice(-1)) })
    const { onMove } = useChessGameView({
        currentOpening, lessonMode: params.lessonMode, lesson: currentOpening && currentOpening[0] && currentOpening[0].lessons ?
            currentOpening[0].lessons.find((lesson) => lesson.lessonId === params.lessonId) : undefined
    })
    const stateLesson = useMoveViewerStore(state => state.currentLesson)
    const handleChangeMode = () => {
        if (lessonMode === "show") {
            // FIXME: uncomment this when fix refresh problem in state
            // if (params.variationId){
            //     history.push(`/practice/${params.openingId}/${params.levelId}/${params.lessonId}/${params.variationId}`)
            // }
            // else{
            //     history.push(`/chapters/${params.openingId}/${params.levelId}/${params.lessonId}/variations`)
            // }
            history.push(`/chapters/${params.openingId}/${params.levelId}/${params.lessonId}/variations`)
        }
        else if (lessonMode === "practice") {
            setGoToShowModal(true)
            // history.push(`/show/${params.openingId}/${params.levelId}/${params.lessonId}/${params.variationId}`)
        }
    }
    const handleGoToShowFromModal = ()=>{
        setGoToShowModal(false)
        history.push(`/show/${params.openingId}/${params.levelId}/${params.lessonId}/${params.variationId}`)
    }
    return (
        <div className="">

            {user && (isPractice === false) && <Nav />}
            {user && displayMoves &&
                <div className="bg-blueGray-50  lg:h-screen ">

                    {(success !== true) ?
                        <div className=" mx-auto py-12 ">
                            <div className=" mx-auto">
                                {(isLoading !== true) && currentOpening && currentOpening.length > 0 &&
                                    <div className="relative">
                                <Modal dropdownRef={clickRef} isToggled={goToShowModal}>
                                    <div style={{position:"absolute", }} className="w-64 md:w-72 left-1/4 lg:w-80 bg-amber-400 text-white absolute top-1/2     rounded-md p-4 ">

                                        <h3>You will lose your practice progress!</h3>
                                        <div className="flex mt-4 mb-2 justify-center">
                                        <button onClick={()=>handleGoToShowFromModal() } className={` text-amber-400 hover:text-amber-300    bg-white w-100 px-6 py-2 rounded-lg  cursor-pointer flex justify-center`}>
                    
                        OKAY

                </button>
                                        

                                        </div>
                        </div>
                                </Modal>
                                        {isPractice && <div className="mx-auto w-full flex space-x-2 justify-center">
                                            <Link to="/">
                                                <XIcon className="text-gray-700 cursor-pointer h-6 w-6" />
                                            </Link>
                                            <ProgressBar progress={currentProgress} />
                                        </div>
                                        }
                                        <div className="w-100 flex space-x-2 items-center  justify-center">
                                            {currentVariation && currentVariation.moves && <h1 className="text-xl lg:text-2xl text-center text-black font-semibold">{stateLesson && stateLesson.name}
                                                {" "} {`${currentVariation.moves[0].moveNumber}${currentVariation.moves[0].turn === "b" ? "..." : "."}${currentVariation.moves[0].notation.notation} `}
                                            </h1>}
                                            {(isPractice || (lessonMode === "show")) &&
                                                <div onClick={() => handleChangeMode()} {...hoverProps} className="relative cursor-pointer px-2 py-2 text-black rounded-lg" >
                                                    {
                                                        lessonMode === "practice" ?
                                                            <img className="  h-6 lg:mt-2  lg:h-6 lg:w-6 w-6" src={`/images/glasses.svg`} /> : <img className="  h-6 lg:mt-2  lg:h-6 lg:w-6 w-6" src={`/images/dumbbell.svg`} />
                                                    }
                                                    {isHovering && <Tooltip message={(lessonMode === "practice") ? "Review in lesson " :
                                                        "Practice variations"} />}
                                                    {/* (lessonMode==="show" && params.variationId) ?  "Practice this variation" : "Practice variations"} />} */}
                                                </div>
                                            }
                                        </div>
                                        <div className="flex lg:flex-row flex-col-reverse justify-center space-x-4 items-start ">

                                            {isPractice && lessonMode === "practice" && false &&
                                                <VariationList handleSetCurrentVariation={handleSetCurrentVariation} variations={variations}
                                                    currentVariation={currentVariation} />
                                            
                                            }
                                            <div className=" flex  justify-center  pt-6 " >
                                                <MoveViewer displayMoves={displayMoves} onMove={onMove} />
                                            </div>
                                        </div>

                                    </div>
                                }
                            </div>
                        </div>
                        :
                        <CongratulateScreen />

                    }
                </div>
            }
        </div>
    )
}
export default Lesson