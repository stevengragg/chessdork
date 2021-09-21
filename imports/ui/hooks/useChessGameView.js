import { useState, useEffect } from 'react'
import useKeyPress from "./useKeyPress"
import {useMoveViewerStore} from "./useMoveViewerStore"
import useSound from 'use-sound';
import { useForceUpdate } from "./useForceUpdate"
import { Chess } from 'chess.js';
import { useParams, useHitory, useHistory  } from "react-router-dom";

// TODO: currentVariation .
// TODO: Save variations to course collection
// TODO: userSuccessRatio, XP points
// TODO: MODE OF show, then you do  for each variation(!!!!!!!!! )

const useChessGameView = ({  lesson, currentOpening , lessonMode:paramsLesson}) => {
    const history = useHistory()
    const params = useParams()
    const [playSound ] = useSound ("/sounds/move.mp3", {volume:0.5})
    const setCurrentVariation = useMoveViewerStore(state => state.setCurrentVariation)
    const updateShapes = useMoveViewerStore(state => state.updateShapes)
    const isPractice = useMoveViewerStore(state => state.isPractice)
    const setUserTurn = useMoveViewerStore(state => state.setUserTurn)
    const setSelectedMove = useMoveViewerStore(state => state.setSelectedMove)
    const selectedMove = useMoveViewerStore(state => state.selectedMove)
    const setParentMove = useMoveViewerStore(state => state.setParentMove)
    const shadowChessGame = useMoveViewerStore(state => state.shadowChessGame)
    const setShadowChessGame = useMoveViewerStore(state => state.setShadowChessGame)
    const setPracticeMoveFens = useMoveViewerStore(state => state.setPracticeMoveFens)
    const practiceMoveFens = useMoveViewerStore(state => state.practiceMoveFens)
    const currentVariation = useMoveViewerStore(state => state.currentVariation)
    const setFirstMove = useMoveViewerStore(state => state.setFirstMove)
    const setCurrentLesson = useMoveViewerStore(state => state.setCurrentLesson)
    const setIsPractice = useMoveViewerStore(state => state.setIsPractice)
    const setVariations = useMoveViewerStore(state => state.setVariations)
    const currentLesson = useMoveViewerStore(state => state.currentLesson)
    const setCurrentOpening = useMoveViewerStore(state => state.setCurrentOpening)
    const setDisplayMoves = useMoveViewerStore(state => state.setDisplayMoves)
    const next = useMoveViewerStore(state => state.next)
    const nextResponse = useMoveViewerStore(state => state.nextResponse)
    const back = useMoveViewerStore(state => state.back)
    const setMoves = useMoveViewerStore(state => state.setMoves)
    const moves = useMoveViewerStore(state => state.moves)
    const setBasePgn = useMoveViewerStore(state => state.setBasePgn)
    const setPGNIntro = useMoveViewerStore(state => state.setPGNIntro)
    const setInitialState = useMoveViewerStore(state => state.setInitialState)
    const setLessonMode = useMoveViewerStore(state => state.setLessonMode)
    const [firstLoad, setFirstLoad] = useState(true)
    const isLeftPressed = useKeyPress('ArrowLeft')
    const isRightPressed = useKeyPress('ArrowRight')
    const forceUpdate = useForceUpdate();
    useEffect(() => {
        initialiseChessGameView()
      
    }, [])
    useEffect(() => {
        return history.listen((location) => { 
           console.log(`You changed the page to: ${location.pathname}`, {lesson}) 
        //    initialiseChessGameView()
           loadLesson()
        }) 
     },[history]) 
    //  useEffect(() => {
    //      let newVariation
    //     if (params && params.variationId  && lesson && lesson.variations){
    //         newVariation= lesson.variations.find((variation)=>variation.variationId===params.variationId)
    //     }
    //     setCurrentVariation(newVariation)
    //  }, [params.variationId])
    const initialiseChessGameView = ()=>{
        setInitialState()
        let chess = new Chess()
        setShadowChessGame(chess)
    }
    const loadMoves = ()=>{
        console.log ("loading moves mate ", )
        setMoves(currentVariation.moves)
        setSelectedMove(currentVariation.moves[0])
        setShadowChessGame(new Chess(currentVariation.moves[0].fen))
        setFirstMove(true)
        updateShapes(currentVariation.moves[0].commentDiag)
    }
    useEffect(() => {
       if (params){
           useMoveViewerStore.setState({params:params})
       }
    }, [params])
    useEffect(() => {
        if (params && params.lessonMode ){
            setLessonMode(params.lessonMode)
            setIsPractice(params.lessonMode==="show"?false:true)
        }
    }, [params])
    useEffect(() => {
        if (isLeftPressed) {
            back(playSound)
        }
        if (isRightPressed) {
            next(playSound)
        }
    }, [isLeftPressed, isRightPressed])

    useEffect (()=>{
        if (selectedMove){
            if (isPractice && params.lessonMode ==="practice" && currentOpening && currentOpening.length>0 && currentOpening[0].orientation.substring(0,1) !== selectedMove.turn){
                setUserTurn(true)
            }
            else{
                setUserTurn(false)
            }
        }
    },[selectedMove])
    useEffect(() => {
        if (selectedMove && shadowChessGame) {
            // IF NEW VARIATION, FOLLOW UP FROM 1 MOVE TO CURRENT. OTHERWISE, MOVE 
            shadowChessGame.move({ from: selectedMove.from, to: selectedMove.to })
        }
    }, [selectedMove])

    // Change in variation of lesson. LOADING MOVES
    useEffect(() => {
        if (currentVariation && currentVariation.moves && currentVariation.moves.length>0){
            loadMoves()
     }
    }, [currentVariation])

    useEffect(() => {
         if (lesson && (currentLesson===undefined || JSON.stringify(currentLesson)!== JSON.stringify(lesson)) ){
            loadLesson()
        }
    }, [ JSON.stringify(lesson)])

      // Effect to manage the "parent" move (when displaying the comments of a move)
      useEffect(() => {
        if (selectedMove && selectedMove.variationLevel === 0) {
            setParentMove(selectedMove)
        }
    }, [selectedMove])
    useEffect(() => {
         if (lesson  ){
             if (firstLoad){
                setFirstLoad(false)
                loadLesson()
             }
        }
    }, [ lesson])

    const loadLesson = ()=>{
        if (lesson){
            setCurrentLesson(lesson)
            setBasePgn(lesson.basePgn)
            loadPGNIntro (lesson.pgn)
            let newVariation
            if (lesson.variations ){
                if (params.variationId){
                    newVariation= lesson.variations.find((variation)=>variation.variationId===params.variationId)
                }
                else{
                    // TODO: TEMPORAL FIX, TAKE OUT
                     newVariation= lesson.variations[0]
                }
                setCurrentVariation(newVariation)
                setMoves(newVariation.moves)
            }
            setVariations ( lesson.variations)
        }
        if (currentOpening){
            setCurrentOpening (currentOpening)
        }
    }
    // load intro comment of a PGN
    const loadPGNIntro = (pgn)=>{
        var intro = pgn.substring(
            pgn.indexOf("{") + 1, 
            pgn.indexOf("}")
        );
        if (intro){
            setPGNIntro (intro)
        }
    }
    // this processing could be in the backend
    useEffect(() => {
        console.log ("MOVES PROCESSING ", moves)
        let dualMod = []
        let displayMov = []
        let currentIndex = 0
        let displayIndex = 0
        if (moves) {
            let initialVariationLevel = moves[0].variationLevel
            //1. extract main line into an array
            moves.forEach((move) => {
                if (move.variationLevel === initialVariationLevel) {
                    dualMod[currentIndex] = { ...move }
                    currentIndex++
                }
            })
            console.log ({dualMod})
            // 2 group moves in pairs (helps to plot)
            dualMod.forEach((mov, i ) => {
                if (i<(dualMod.length-1)){
                    if (mov.turn === "w") {
                        displayMov[displayIndex] = displayMov[displayIndex] ? [displayMov[displayIndex], mov] : mov
                    }
                    if (mov.turn === "b") {
                        displayMov[displayIndex] = displayMov[displayIndex] ? [displayMov[displayIndex], mov] : mov
                        displayIndex++
                    }
                }
                else{
                    displayMov[displayIndex] = [mov]
                }
            })
        }
        console.log({movesDisplay: displayMov})
        setDisplayMoves(displayMov)
    }, [moves])


    // onMove in practice mode! 
    const onMove = (from, to) => {
        if (params.lessonMode === "practice") {
            playSound()
            shadowChessGame.move({ from, to })
            const possibleMoves = shadowChessGame.moves({ verbose: true })
            for (let i = 0, len = possibleMoves.length; i < len; i++) { /* eslint-disable-line */
                if (possibleMoves[i].flags.indexOf("p") !== -1 && possibleMoves[i].from === from) {
                    console.log({ from, to })
                    return
                }
            }
            if (moves) {
                let nextMove = moves.find((move) => move.index === selectedMove.next)
                let indexOfProgress  = moves.indexOf((nextMove))
                console.log({indexOfProgress, length: moves.length, moves})
                {
                    if (nextMove && nextMove.from === from && nextMove.to === to) {

                        setSelectedMove(nextMove)
                        useMoveViewerStore.setState({currentProgress:( (indexOfProgress>0?(indexOfProgress+1): indexOfProgress)/  moves.length) *100 })
                        // Update the list of fens that have been used (used to determine whether o not we can move back and next in practice mode)                   
                        setPracticeMoveFens([...practiceMoveFens, nextMove.fen])
                        updateShapes(nextMove.commentDiag)
                        shadowChessGame.move({ from, to, promotion: "x" })
                        setTimeout(function () { nextResponse(playSound) }, 500);
                    }
                    else {
                        shadowChessGame.move({ from, to, promotion: "x" })
                        undo()
                    }
                }

            }
        }
    }

    // Called when user does wrong move
    // TODO: Add red arrow 
    // TODO: Add sound of wrong move
    const undo = () => {
        setTimeout(function () {
            shadowChessGame.undo()
            console.log({ fen: selectedMove.fen })
            // setSelectedFen(selectedMove.fen)
            forceUpdate()
        }
            , 500);
    }
    return ({   onMove })
    // return ({  moves, onMove })
}


export default useChessGameView