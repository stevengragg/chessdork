import React from 'react'
import * as uuid from 'uuid'

const Nags = ({ nags }) => {

    return (
        <>
        {nags.map((nag ) => {
        return (
            <span key ={uuid.v4()}>
                {nag}
            </span> 
            ) })
 }
        </>
    )


}

const getNags = (nagCode, nagArray) => {
    let nags = []
    console.log("nAG CODE ", nagCode)
    nagCode.forEach((nag, i) => {
        let nagPos = parseInt(nag.replace("$", ""))
        nags[i] = nagArray[nagPos]

    })
    return nags
}



export default Nags