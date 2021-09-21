import React , {useState} from 'react'
import { useParams } from "react-router-dom";
import { useTracker } from 'meteor/react-meteor-data'
import Nav from "../../components/nav/Nav"
import MoveViewer from "../../components/chess/lesson/MoveViewer"
import {OpeningCollection} from  "../../../api/openings"
/* 
Tips  Component
If the user is logged in and has the corresponding lesson, load data (pgn, etc)
If not, redirect to home  (or show a 404 lesson not found)

For now, we will return the whole level 
*/
const Tips = () => {
    const params = useParams()
    const user = useTracker(() => Meteor.user());
    const { currentLesson, isLoading } = useTracker(() => {
        const noDataAvailable = { currentLesson: [] };
        const handler = Meteor.subscribe('currentLesson', {openingId: params.openingId, level: 1});
        if (!handler.ready()) {
            return { ...noDataAvailable, isLoading: true };
          }
        const currentLesson = OpeningCollection.find({}).fetch()
        console.log ({currentLesson, params})
         return {currentLesson}
    }) 
   
    return (
        <div className="">
            <Nav />
            <div className=" bg-blueGray-50">
                <div className="max-w-7xl mx-auto py-12 ">

                    {user &&
                        <div className="max-w-7xl mx-auto">

                            { (isLoading !==true) &&  currentLesson && currentLesson.length>0 && 
                                <div >
                                    <h1 className="text-2xl lg:text-3xl text-center text-black font-semibold	 ">{currentLesson[0].name} Intro</h1>
                                <div className="  flex  justify-center max-w-7xl pt-6 " >
                                    <MoveViewer lesson={currentLesson[0].lessons[0]} />
                                </div>

                                </div>

                            }
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
export default Tips