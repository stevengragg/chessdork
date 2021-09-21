import create from "zustand"
import {getShapes} from "../../../utils/gameUtils"
import { devtools } from 'zustand/middleware'
const initialState = {
    currentLesson : undefined,
    success : false,
    currentProgress: 0,
    userTurn : false, // In practice mode, when the user has to enter the move
    displayMoves: undefined,
    shadowChessGame: undefined,
    variations :[],
    currentOpening :[],
    currentVariation: [],
    pgnIntro: "",
    firstMove: false,
    isPractice: true, 
    lessonMode: "show", // view,  show, practice, quiz
    basePgn: undefined, 
    selectedMove: {},
    practiceMoveFens: [],
    parentMove: {}, // used to display comments on a move
    currentShapes: [],
    moves: undefined, // Moves in the current variation (or whole game, depending on mode)
    scrollBy: 0 ,
    boxHeight: 0 ,
}
export const useMoveViewerStore = create(
    devtools(set => ({  
    ...initialState,
    params:{},
    setCurrentProgress: (value) => set((state) => ({ currentProgress: value })),
    setSuccess : (value) => set((state) => ({ success: value })),
    setUserTurn : (value) => set((state) => ({ userTurn: value })),
    setCurrentLesson: (value) => set((state) => ({ currentLesson: value })),
    setCurrentOpening: (value) => set((state) => ({ currentOpening: value })),
    setDisplayMoves: (value) => set((state) => ({ displayMoves: value })),
    setShadowChessGame: (value) => set((state) => ({ shadowChessGame: value })),
    setVariations: (value) => set((state) => ({ variations: value })),
    handleSetCurrentVariation: (value) => set((state) => {
        if (value && Object.keys(value).length>0){
            console.log({value})
            state.setCurrentVariation(value)
            state.setMoves(value.moves)
        }   
       }),
    setCurrentVariation: (value) => set((state) => ({ currentVariation: value })),
    setPGNIntro: (value) => set((state) => ({ pgnIntro: value })),
    setFirstMove: (value) => set((state) => ({ firstMove: value })),
    setIsPractice : (value) => set((state) => ({ isPractice: value })),
    setOpeningId : (value) => set((state) => ({ openingId: value })),
    setLessonMode : (value) => set((state) => ({ lessonMode: value })),
    setBasePgn : (value) => set((state) => ({ basePgn: value })),
    setPracticeMoveFens : (value) => set((state) => ({ practiceMoveFens: value })),
    setParentMove: (value) => set((state) => ({ parentMove: value })),
    setMoves: (moves) => set((state) => ({ moves: moves })),
    setScrollBy: (value) => set((state) => ({ scrollBy: value })),
    setBoxHeight: (value) => set((state) => ({ boxHeight: value })),
    updateShapes: (commentDiag) => set(state => {
        if (commentDiag) {
            const shapes = getShapes(commentDiag)
            if (shapes && shapes.length > 0) {
                return ({ currentShapes: getShapes(commentDiag) })
            }
            else {
                return ({ currentShapes: getShapes(commentDiag) })
            }
        }
        else {
            return ({ currentShapes: getShapes(commentDiag) })
        }
    }),
    setCurrentShapes: (shapes) => set((state) => ({ currentShapes: shapes })),
    setInitialState: () => set((state) => ( initialState )),
    setSelectedMove: (move) => set((state) => ({ selectedMove: move })),
    // next when responding to human move (called fom onMove)
    nextResponse: (playSound)=> set ((state)=>{
        state.setFirstMove(false)
        if (state.moves && state.selectedMove && Object.keys(state.selectedMove).length > 0) {
            if (state.selectedMove.next){
                playSound()   
                let nextMove = state.moves.find((move)=> move.index===state.selectedMove.next)
                // important: adding Fen to list of "already done" Fens so the user can later scroll back and forth 
                state.setPracticeMoveFens([...state.practiceMoveFens, nextMove.fen])
                if (nextMove){
                    let commentDiag = nextMove.commentDiag
                    state.setSelectedMove(nextMove)
                    state.updateShapes(commentDiag)
                }
            }
            else {
                Meteor.call('variationUpdate', {lessonId: state.currentLesson.lessonId ,
                    variationId:state.currentVariation.variationId, openingId: state.params.openingId ,levelId:state.params.levelId,
                     finished:true})    
                state.setSuccess(true)
                state.setCurrentProgress(100)
            }
        }
    }),
    // next when calling from button
    next : (playSound )=> set((state)=>{
        state.setFirstMove(false)
        if (state.moves && state.selectedMove && Object.keys(state.selectedMove).length > 0 && state.selectedMove.next) {
            if (state.selectedMove.next){   
                let nextMove = state.moves.find((move)=> move.index===state.selectedMove.next)
                if (nextMove){
                        console.log ({includes:state.practiceMoveFens.includes(nextMove.fen), nextfen: nextMove.fen})

                        if (state.lessonMode!=="practice" || (state.lessonMode==="practice"&& state.practiceMoveFens.includes(nextMove.fen))){
                        playSound()   
                        let commentDiag = nextMove.commentDiag
                        state.setSelectedMove(nextMove)
                        state.updateShapes(commentDiag)
                        }
                    }
                
            }
        }
        // going "up" to the parent variation
        else if (state.parentMove.next){
            playSound()   
            let nextMove = state.moves.find((move)=> move.index===state.parentMove.next)
            if (nextMove){
                let commentDiag = nextMove.commentDiag
                state.setSelectedMove(nextMove)
                state.updateShapes(commentDiag)
                // state.setScrollBy(state.scrollBy  + 14)
            }
        }
        else if (state.moves && Object.keys(state.selectedMove).length === 0) {
            state.setSelectedMove(state.moves[0])
            state.setScrollBy(0)
        }
       
    }),
    back : (playSound)=> set((state)=>{
        if (state.moves && state.selectedMove && Object.keys(state.selectedMove).length > 0 && (isNaN(state.selectedMove.prev) === false)) {
            let prev = state.moves.find((move)=> move.index===state.selectedMove.prev)
            if (prev ){
                playSound()
                let commentDiag = prev.commentDiag
                state.setSelectedMove(prev)
                state.updateShapes(commentDiag)
            }
        }
        else {
            state.setSelectedMove({})
            state.setScrollBy(0 )
            state.setFirstMove(true)
        }

    }),
    last : ()=> set((state)=>{
        let lastMove = state.moves[state.moves.length-1]
        let commentDiag = lastMove.commentDiag
        state.setSelectedMove(lastMove)
        state.updateShapes(commentDiag)
        state.setScrollBy(state.boxHeight+50)
    }),
    first : ()=> set((state)=>{
        state.setSelectedMove({})
        state.setScrollBy(0)
        state.updateShapes()

    }),
})))
