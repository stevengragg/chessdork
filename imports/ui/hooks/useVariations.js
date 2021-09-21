import {useState, useEffect} from "react"
import useCourse from "./useCourse"
import useOpening from "./useOpening"
import {useParams} from "react-router-dom"
// hook to get variation list from openingid, levelId, lesosnId

 const useVariations = ({openingId, level, lessonId}) => {
    const {currentOpening, isLoading: openingLoading } = useOpening({openingId, level })
    const {course } = useCourse( )
    const params = useParams()
    console.log ({course})
    const [variations, setVariations] = useState()
    const [currentLesson, setCurrentLesson] = useState()
    const [currentLevel, setCurrentLevel] = useState()

    useEffect (()=>{
        let variationList =[]
        let currentLesson
        let currentLevel 
        if (course  &&  currentOpening){
            if (currentOpening && currentOpening.length>0  && currentOpening[0].lessons){
                currentOpening[0].lessons.forEach((lesson)=>{
                    console.log ({lesson, lessonId})
                    if (lesson.lessonId ===lessonId){
                        variationList.push(...lesson.variations)
                        currentLesson= lesson
                    }})
            }

            // FIXME: CRUTCH, ALL VARIATIONS INFO SHOULD ALREADY BE IN COURSE COLLECTION
            if (course[0] && course[0].levels ){
                course[0].levels.forEach((level)=>
                {
                    if (level.openingId === params.openingId && level.levelId===params.levelId){
                        currentLevel = level
                        level.lessons.forEach((lesson)=>{
                            console.log ({lesson})
                            if (lesson.lessonId ===lessonId){
                                currentLesson= {...currentLesson, ...lesson}
                                variationList.forEach((variation, i )=>{
                                     let courseCollectionVariation= lesson.variations.find((variat)=>variat.variationId===variation.variationId)
                                     variation= {...variation, ...courseCollectionVariation}
                                     variationList[i]= variation
                                })
                            }
                        })
                    }
                    
                })
                setVariations(variationList)
                setCurrentLesson(currentLesson)
                setCurrentLevel(currentLevel)

            }
        }
    }, [JSON.stringify(currentOpening),JSON.stringify(course) ])

    return {currentOpening, currentLevel, currentLesson, isLoading: (openingLoading && variations && currentOpening && currentLevel) ,  variations}
}

export default useVariations