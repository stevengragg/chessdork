import React from 'react'

export default VariationList = ({currentVariation, variations}) => {
    return (
        <div>
            <span className="my-2"> Variations </span>
            <div className="h-72 lg:h-80 overflow-auto px-2 py-2 w-48 rounded-md shadow-md bg-white ">
                {variations && variations.map((variation, i) => {
                    return (
                        <div className={`my-2 hover:text-amber-600 cursor-pointer ${currentVariation.moves[0].moveId === variation.moves[0].moveId ? "text-amber-500" : "text-gray-700"}`} onClick={() => handleSetCurrentVariation(variation)} key={variation.fen}>
                            <span className="mr-2">{i + 1}</span>
                            <span>  {variation.moves[0].moveNumber} {variation.moves[0].turn === "b" ? "..." : "."} {variation.moves[0].notation.notation} </span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
