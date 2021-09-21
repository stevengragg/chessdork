import React from 'react'
import Tooltip from "../../components/common/Tooltip"
import useHover from 'react-use-hover';

export default Variation = ({handleGoToVariation ,handleShowVariation, i , variation}) => {
    const [isHovering, hoverProps] = useHover();
    const [isHoveringDumbbell, hoverDumbbellprops] = useHover();

    return (
        <div key={variation.fen} className="bg-white shadow-md rounded-lg p-4 my-2 w-3/4 lg:w-2/3">
            <div className={`  hover:text-amber-600 cursor-pointer`} onClick={() => handleGoToVariation({ variationId: variation.variationId })}
                key={variation.fen}>
                <span className=" mr-2">{i + 1}</span>
                <span className="hover:text-amber-600">  {variation.moves[0].moveNumber} {variation.moves[0].turn === "b" ? "..." : "."}
                    {variation.moves[0].notation.notation}  {variation.finished ? "Practice moves" : "Learn"}

                </span>
            </div>
            <div className="flex space-x-6 justify-end">
                <span {...hoverDumbbellprops} onClick={() => handleGoToVariation({ variationId: variation.variationId })}
                 className=" relative cursor-pointer flex space-x-2 ">
                    {/* {variation.finished ? " Theory" : " Theory"} */}
                    <img className="  h-6 lg:mt-2  lg:h-8 lg:w-8 w-6" src={`/images/dumbbell.svg`} />
                    {isHoveringDumbbell && <Tooltip message={` ${variation.finished? "Practice the moves": "Learn the moves"}`} />}
                </span>
                <span {...hoverProps} onClick={() => handleShowVariation({ variationId: variation.variationId })}
                 className=" relative cursor-pointer flex space-x-2 ">
                    {/* {variation.finished ? " Theory" : " Theory"} */}
                    <img className="  h-6 lg:mt-2  lg:h-8 lg:w-8 w-6" src={`/images/glasses.svg`} />
                    {isHovering && <Tooltip message={"Check the theory"} />}
                </span>
            </div>
        </div>
    )
}
