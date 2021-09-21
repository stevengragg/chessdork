import React from 'react'
import * as uuid from 'uuid'
import Nags from "./Nags"
import { getNags } from "../../../../../utils/gameUtils"
import { useMoveViewerStore } from "../../../hooks/useMoveViewerStore"

const Variations = ({ variations }) => {
    const basePgn = useMoveViewerStore(state => state.basePgn)


    return (
        <div>
            {variations.map((variation) =>
                <div className="p-2" key={uuid.v4()}>
                    {variation.map((move, i) => {
                        return (
                            < React.Fragment key={uuid.v4()}>
                                <span key={uuid.v4()} className=" mb-1 mr-1">
                                    {move.commentDiag && move.commentDiag.comment}
                                </span>
                                <InlineMove move={move} i={i} basePgn={basePgn} />
                                {move.variations && move.variations.length > 0 &&
                                    <Variations variations={move.variations} basePgn={basePgn} />
                                }
                            </React.Fragment>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

const InlineMove = ({ move, i, basePgn }) => {
    const selectedMove = useMoveViewerStore(state => state.selectedMove)
    const setSelectedMove = useMoveViewerStore(state => state.setSelectedMove)
    const setScrollBy = useMoveViewerStore(state => state.setScrollBy)
    const updateShapes = useMoveViewerStore(state => state.updateShapes)
    const handleSelectedMove = (e) => {
        setSelectedMove(move)
        let commentDiag = move.commentDiag
        updateShapes(commentDiag)
        const elem = e.target;
        const rect = elem.getBoundingClientRect();
        const scrollTop = document.documentElement.scrollTop;
        const absoluteY = scrollTop + rect.top;

    }
    return (
        <span onClick={handleSelectedMove} className={` hover:text-white ${selectedMove.moveId === move.moveId ? "bg-amber-500 text-white" : "bg-white"} hover:bg-amber-600 mb-1 cursor-pointer mr-1`}>
                {(i === 0 && move.turn === "b") ? move.moveNumber + "..." : move.turn !== "b" && move.moveNumber}
                {move.turn === "w" ? "." : ""}
            
            {move.notation.fig && <img style={{marginTop:-2}} className="h-4 w-4 inline  " src={`/images/wiki/${move.notation.fig}.svg`} />}
                {move && move.notation && move.notation.notation && move.notation.fig ?
                    move.notation.notation.substring(1) :
                    move.notation && move.notation.notation
                }

            {move.nag &&  basePgn && basePgn.NAGS &&  <Nags nags={getNags(move.nag, basePgn.NAGS)} />}
        </span>
    )
}
export default Variations
