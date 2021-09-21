// MOVES BOX IN LESSON SHOW MODE

import React, { useRef, useState, useEffect } from 'react'
import Variations from "./Variations"
import { useMoveViewerStore } from "../../../hooks/useMoveViewerStore"
import useHover from 'react-use-hover';
import ViewerButtons from './ViewerButtons';

const LessonMovesBox = () => {
    const [isHovering, hoverProps] = useHover();
    const currentLesson = useMoveViewerStore(state => state.currentLesson)
    const parentMove = useMoveViewerStore(state => state.parentMove)
    const setLessonMode = useMoveViewerStore(state => state.setLessonMode)
    const currentOpening = useMoveViewerStore(state => state.currentOpening)
    const success = useMoveViewerStore(state => state.success)

    const userTurn = useMoveViewerStore(state => state.userTurn)

    const firstMove = useMoveViewerStore(state => state.firstMove)
    const pgnIntro = useMoveViewerStore(state => state.pgnIntro)
    const selectedMove = useMoveViewerStore(state => state.selectedMove)
    const lessonMode = useMoveViewerStore(state => state.lessonMode)
    const displayMoves = useMoveViewerStore(state => state.displayMoves)
    const [showBubble, setShowBubble] = useState(true)
    const boxRef = useRef()
    React.useLayoutEffect(() => {
        console.log({ current: boxRef && boxRef.current })
        if (boxRef && boxRef.current && boxRef.current.clientHeight > boxRef.current.scrollHeight) {
            console.log("bubble")
            setShowBubble(true);
        }
        else {
            setShowBubble(false)
        }
    }, [boxRef]);
    return (
        <div className="lg:w-1/2 ">
            {lessonMode ==="show" &&
             <div className="text-sm  max-w-xl ">
                {
                    (firstMove || (parentMove && parentMove.commentAfter)) &&
                    <div ref={boxRef} className={`${showBubble && "speechBubble"} relative overflow-y-auto lg:max-h-56 text-sm border-gray-200   border-1 p-3 shadow-md rounded-xl  bg-white`}>
                        {firstMove ? pgnIntro : parentMove.commentAfter}
                        {parentMove && parentMove.variations &&
                            <Variations variations={parentMove.variations}
                            />}
                    </div>
                }
                <img className="h-44 lg:mt-2  lg:h-48 lg:w-48 w-44" src={`/images/lessonIcons/rookLesson.svg`} />
                
                <ViewerButtons/>
            </div>}

            {lessonMode ==="practice" && 
            <div className=" h-72 lg:h-96 flex flex-col items-center justify-end">
                                  { success? 
                    <div ref={boxRef} className={`speechBubble relative lg:max-h-56 text-sm border-gray-200   border-1 p-3 shadow-md rounded-xl  bg-white`}>
                                  <span> Well done!!  </span>                           
                  </div> 
                  : 
                    userTurn && 
                                    <div ref={boxRef} className={`speechBubble relative lg:max-h-56 text-sm border-gray-200   border-1 p-3 shadow-md rounded-xl  bg-white`}>
                                    <span> Your move... </span>                           
                    </div>
                    }

                    {success? 
                    <img className="h-44 lg:mt-2  lg:h-48 lg:w-48 w-44" src={`/images/lessonIcons/bishopSuccess.svg`} /> :
                    <img className="h-44 lg:mt-2  lg:h-48 lg:w-48 w-44" src={`/images/lessonIcons/bishopPractice.svg`} />
                }

                </div>
                
                }

        </div>
    )
}
export default LessonMovesBox