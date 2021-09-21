import React, {  useState } from 'react'
import Chessground from "react-chessground"
import "react-chessground/dist/styles/chessground.css"
import { friedLiver, schliemann } from "../../../../utils/mockData"
import { useLesson } from '../../hooks/useLesson';
import { useTracker } from 'meteor/react-meteor-data'
import { OpeningCollection } from '/imports/api/openings';
import {Link} from "react-router-dom"
import { AccountsReactComponent } from 'meteor/gwened:meteor-accounts-react'
import {lesson1} from "../../../../utils/studies/rl-central-gambit/lesson1"
//TODO: Move useTracker to R. Query 
const Example = () => {
    const [currentOpening, setCurrentOpening] = useState({})

    // try{
    //     const pgn = new Pgn(lesson1.pgn)
    // }
    // catch(e){
    //     console.log(e)
    // }


    const { openings, isLoading } = useTracker(() => {
        const noDataAvailable = { openings: [] };
        const handler = Meteor.subscribe('opening');
        if (!handler.ready()) {
            return { ...noDataAvailable, isLoading: true };
          }
        const openings = OpeningCollection.find()
        console.log ({openings})
         return {openings}
    }) 

    const user = useTracker(() => Meteor.user());
    const { chess, fen, lastMove, userColor, turnColor, onMove, calcMovable, flipBoard } = useLesson({ currentOpening })
    return (
        <div>
            {user ?
                <>
                    {openings && openings.map((opening) => {
                        return (
                            <div  key={opening.levelId} onClick={() => setCurrentOpening(opening)}>Load {opening.name}</div>
                        )
                    })}
                  
                    {chess &&
                        <div className="mt-6 mx-auto">
                            <div className="mx-4 my-2 rounded-lg ">Learning: {currentOpening.name}</div>
                            <Chessground
                                orientation={userColor}
                                turnColor={turnColor()}
                                movable={calcMovable()}
                                lastMove={lastMove}
                                fen={fen}
                                onMove={onMove}
                                style={{ margin: "auto" }} />
                                
                            <div className="w-100 flex flex-col items-center justify-items-center ">
                                <div onClick={() => flipBoard()} className="flex  items-center rounded-lg max-w-3xl  flex-col  my-4 justify-items-center px-6 py-2 shadow-lg  cursor-pointer hover:bg-gray-50" >
                                    <span className="px-6 py-2  text-2xl" style={{ fontFamily: "lichess" }} >B</span>
                                    <span>Flip board</span>
                                </div>
                            </div>
                            <div className="w-100 flex flex-col items-center justify-items-center ">
                                <div onClick={() => setCurrentOpening(currentOpening.name === "Schliemann" ? friedLiver : schliemann)} className="flex  items-center rounded-lg max-w-3xl  flex-col  my-4 justify-items-center px-6 py-2 shadow-lg  cursor-pointer hover:bg-gray-50" >
                                    <span className="px-6 py-2  text-2xl" style={{ fontFamily: "lichess" }} >B</span>
                                    <span>Next lesson</span>
                                </div>
                            </div>
                        </div>

                    }
                </>
                :
                <div className="max-w-3xl shadow-md rounded-lg py-2 px-4 ">
                    <Link to ="/auth/login">Login</Link>
                    <AccountsReactComponent />
                </div>

            }

        </div>
    )
}
export default Example