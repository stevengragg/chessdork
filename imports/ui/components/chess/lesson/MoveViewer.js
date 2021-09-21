import React, { useRef, useEffect } from 'react'
import Chessground from "react-chessground"
import "react-chessground/dist/styles/chessground.css"
import { useMoveViewerStore } from "../../../hooks/useMoveViewerStore"
import useComponentSize from '@rehooks/component-size'
import MovesBox from "./MovesBox"
import useScreenSize from '../../../hooks/useScreenSize'
import LessonMovesBox from './LessonMovesBox'

// TODO: load current variation
// TODO: 

const MoveViewer = ({onMove}) => {
    const currentShapes = useMoveViewerStore(state => state.currentShapes)
    const shadowChessGame = useMoveViewerStore(state => state.shadowChessGame)
    const currentLesson = useMoveViewerStore(state => state.currentLesson)
    const currentOpening = useMoveViewerStore(state => state.currentOpening)
    const selectedMove = useMoveViewerStore(state => state.selectedMove)
    const userTurn = useMoveViewerStore(state => state.userTurn)
    const basePgn = useMoveViewerStore(state => state.basePgn)
    const lessonMode = useMoveViewerStore(state => state.lessonMode)
    const screenSize = useScreenSize()
    const isPractice = useMoveViewerStore(state => state.isPractice)
    const moves = useMoveViewerStore(state => state.moves)
    console.log ({moves})
    const boxHeight = useMoveViewerStore(state => state.boxHeight)
    const scrollBy = useMoveViewerStore(state => state.scrollBy)
    const setBoxHeight = useMoveViewerStore(state => state.setBoxHeight)
    let boardRef = useRef(null)
    let movesRef = useRef(null)
    let boardSize = useComponentSize(boardRef)
    useEffect(() => {
        if (movesRef && isPractice===false) {
            if (!isNaN(scrollBy)) {
                movesRef.current.scrollTop = scrollBy
            }
        }
    }, [scrollBy])
    useEffect(() => {
        if (movesRef && isPractice===false && movesRef.current) {
            const height = movesRef.current.offsetHeight;
            if (boxHeight !== height) {
                setBoxHeight(height) //height of the move panel
            }
        }
    }, [isPractice, movesRef])

    const turnColor = () => {
        return selectedMove.turn === "b" ? "white" : "black"
    }

    const calcMovable = () => {
        const dests = new Map()
        if (shadowChessGame && lessonMode === "practice") {
            console.log({ shadowChessGame, move: shadowChessGame.moves() })
            shadowChessGame.SQUARES.forEach(s => {
                const ms = shadowChessGame.moves({ square: s, verbose: true })
                if (ms.length) dests.set(s, ms.map(m => m.to))
            })

            console.log({ dests, currentOpening, orientation: currentOpening && currentOpening[0] && currentOpening[0].orientation })
            return {
                // free: false, dests, color: currentOpening[0]&&  currentOpening[0].orientation
                free: false, dests, color: "white"
            }
        }
        else{
            return {free:false, dests, color:"white"}
        }
    }
    return (
        < div style={{ minWidth: screenSize.width > 1024 ? "55rem" : "20rem", maxWidth: "80rem" }} className=" flex flex-col lg:flex-row space-y-4 lg:space-y-0  lg:space-x-6  lg:items-center  ">
            {basePgn && basePgn.game &&
                <div style={{ paddingBottom: screenSize.width > 1024 ? isPractice===false ? "55%" : "58%" : "100%", width: "100%" }} className=" relative " ref={boardRef}>
                    <div>
                        <Chessground turnColor={turnColor()} 
                            drawable={{ enabled: false, visible: true, autoShapes: currentShapes && currentShapes.length > 0 ? currentShapes : [] }}
                            orientation={currentLesson.orientation} movable={calcMovable()} onMove={onMove}
                            fen={Object.keys(selectedMove).length > 0 ? selectedMove.fen : "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"}
                            lastMove={selectedMove && selectedMove.from ? [selectedMove.from, selectedMove.to] : null}
                            style={{    display: "table", height: boardSize.width, top: 0, width: "100%",
                                position: "absolute", maxWidth: 800, maxHeight: 800
                            }}
                            resizable={true}
                        />
                    </div>
                </div>
            }

            {isPractice &&    <LessonMovesBox />    }
            { isPractice===false && <MovesBox movesRef={movesRef} />  }

        </div>
    )
}


export default MoveViewer
