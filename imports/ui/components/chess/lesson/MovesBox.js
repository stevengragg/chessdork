
// MOVES BOX IN VIEWER MODE
import * as uuid from 'uuid'
import Variations from "./Variations"
import ViewerButtons from "./ViewerButtons"
import Nags from "./Nags"
import { getNags } from "../../../../../utils/gameUtils"
import { useMoveViewerStore } from "../../../hooks/useMoveViewerStore"

import React from 'react'


const MovesBox  = ({ movesRef} )=>{
    const displayMoves = useMoveViewerStore(state => state.displayMoves)
    const basePgn = useMoveViewerStore(state => state.basePgn)

    return (

        <div>
        <div style={{width:360}} ref={movesRef} className="max-w-lg lg:max-w-3xl py-1 h-96 overflow-scroll text-sm border-gray-200 border-1">
            {displayMoves && displayMoves.length > 0 &&
                displayMoves.map((move, i) => {
                    let whiteComment = move[0] && move[0].commentDiag && move[0].commentDiag.comment ? true : false
                    let blackComment = move[1] && move[1].commentDiag && move[1].commentDiag.comment ? true : false
                    let whiteVariations = move[0] && move[0].variations && move[0].variations.length > 0 ? true : false
                    let blackVariations = move[1] && move[1].variations && move[1].variations.length > 0 ? true : false
                    return (
                        <div key={i} className=" ">
                            {whiteVariations || whiteComment || (move && move.length === 1) ?
                                <>
                                    {move[0] && <SingleMoveLine move={move[0]} turn={move[0].turn} hasComment={whiteComment} hasVariations={whiteVariations} basePgn={basePgn} />}
                                    {move[1] && <SingleMoveLine move={move[1]} turn={move[1].turn} hasComment={blackComment} hasVariations={blackVariations} basePgn={basePgn} />}
                                </>
                                :
                                <div key={uuid.v4()} className="flex flex-wrap  bg-gray-100 ">
                                    {move && move[0] &&
                                        <div className="flex items-center justify-center  w-2/12 text-center text-gray-600">{move[0].turn === "w" ? " " + move[0].moveNumber : " "}</div>}
                                    {move && move[0] && <Move move={move[0]} basePgn={basePgn} />}
                                    {move && move[1] && <Move move={move[1]} basePgn={basePgn} />}
                                </div>
                            }
                        </div>
                    )
                })}
        </div>
        <ViewerButtons />


    </div>
    )
}
export default MovesBox
// Move component 
const Move = ({ move }) => {
    const selectedMove = useMoveViewerStore(state => state.selectedMove)
    const basePgn = useMoveViewerStore(state => state.basePgn)
    const setSelectedMove = useMoveViewerStore(state => state.setSelectedMove)
    const updateShapes = useMoveViewerStore(state => state.updateShapes)
    const setScrollBy = useMoveViewerStore(state => state.setScrollBy)
    const handleSelectMove = (e) => {
        const elem = e.target;
        const rect = elem.getBoundingClientRect();
        const scrollTop = document.documentElement.scrollTop;
        const absoluteY = scrollTop + rect.top;
        setScrollBy(absoluteY)
        setSelectedMove(move)
        let commentDiag = move.commentDiag
        updateShapes(commentDiag)
    }
    return (
        <div onClick={handleSelectMove}
            className={`w-5/12 flex cursor-pointer px-2 py-1 rounded-sm hover:text-white ${selectedMove.moveId === move.moveId ? "bg-amber-500 text-white" : "bg-white"} hover:bg-amber-600 font-semibold`}  >
            {move.notation.fig && <img style={{ marginTop: 0.5 }} className="h-4 w-4  " src={`/images/wiki/${move.notation.fig}.svg`} />}
            <span className="">
                {move && move.notation && move.notation.notation && move.notation.fig ?
                    move.notation.notation.substring(1) :
                    move.notation && move.notation.notation
                }
            </span>
            {move.nag && basePgn && basePgn.NAGS && 
                <Nags nags={getNags(move.nag, basePgn.NAGS)} />}
        </div>
    )
}


// When there's comments we don't display the second move in the same line
const SingleMoveLine = ({ move, turn, hasComment, hasVariations, basePgn }) => {
    return (
        <div>
            {turn === "w" ?
                <div key={uuid.v4()} className="flex flex-wrap  bg-gray-100  ">
                    {move &&
                        <div className="flex items-center justify-center w-2/12 text-center text-gray-600 ">{move.moveNumber}</div>}
                    {move &&
                        <Move move={move} basePgn={basePgn} />
                    }
                    <div className=" w-5/12 bg-white   rounded-sm  font-semibold ">
                        <span className="px-2 py-1 font-semibold">
                            ...
                    </span>
                    </div>
                </div>
                :
                <div key={uuid.v4()} className="flex flex-wrap  bg-gray-100 ">
                    {move &&
                        <div className=" flex items-center justify-center w-2/12 text-center">{move.moveNumber}</div>}
                    {move &&
                        <div className=" w-5/12 bg-white  px-2 py-1 rounded-sm  font-semibold ">
                            <span className="font-semibold">{move.turn === "w" ? " " + "." : " "}
               ...
                </span>
                        </div>
                    }
                    {move && <Move move={move} basePgn={basePgn} />}
                </div>
            }
            {(hasComment || hasVariations) && <CommentsAndVariations move={move} basePgn={basePgn} />}
        </div>
    )
}

const CommentsAndVariations = ({ move }) => {
    return (
        <>
            {((move.variations && move.variations.length > 0) || move.commentDiag) &&
                <div className="bg-white border border-gray-100 " >
                    <div className="font-normal   ">
                        {move.commentDiag && move.commentDiag.comment &&

                            <div className="px-2  py-1">
                                {move.commentDiag.comment}
                            </div>
                        }
                        {move.variations && move.variations.length > 0 &&
                            <Variations variations={move.variations}  />
                        }
                    </div>
                </div>
            }
        </>
    )
}
