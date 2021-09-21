import { useState, useEffect } from 'react'
import { Chess } from "chess.js"; // import Chess from  "chess.js"(default) if recieving an error about new Chess not being a constructor
import useKeyPress from "./useKeyPress"

export const useLesson = ({ currentOpening }) => {
    const [chess, setChess] = useState()
    const [pendingMove, setPendingMove] = useState()
    const [selectVisible, setSelectVisible] = useState(false)
    const [lastMove, setLastMove] = useState()
    const [fen, setFen] = useState()
    const startingFen = new Chess().fen()
    const [expectedPositions, setExpectedPositions] = useState()
    const [userColor, setUserColor] = useState("white")

    const [gameFuture, setGameFuture] = useState([]) // array to store the history of moves 
    const isLeftPressed = useKeyPress('ArrowLeft')
    const isRightPressed = useKeyPress('ArrowRight')

    const loadLesson = () => {
        loadLessonFens()
        let game = new Chess()
        setChess(game)
        setFen(game.fen())
        setUserColor(currentOpening.orientation)
    }
    useEffect(() => {
        if (currentOpening && Object.keys(currentOpening).length > 0) {
            loadLesson()
        }

    }, [currentOpening])

    useEffect(() => {
        if (isLeftPressed) {
            back()
        }
        if (isRightPressed) {
            next()
        }
    }, [isLeftPressed, isRightPressed])
    const flipBoard = () => {
        if (userColor === "white") {
            setUserColor("black")
        }
        else {
            setUserColor("white")
        }
    }

    const back = () => {
        var future = [...gameFuture]
        var moves = chess.history();
        var tmp = new Chess();
        var previous = moves.length - future.length - 1;
        for (var i = 0; i < previous; i++) {
            tmp.move(moves[i]);
        }
        var previous_fen = tmp.fen();
        tmp.move(moves[previous]);


        if (future && tmp.fen() !== future[future.length - 1] && tmp.fen() !== startingFen) {
            future.push(tmp.fen());
            setGameFuture(future)
            setFen(previous_fen)
        }

    }

    const next = () => {
        var future = [...gameFuture]
        setFen(future[future.length - 1])
        future.pop()
        setGameFuture(future)
    }

    const loadLessonFens = () => {
        // Initialize lesson positions
        let lesson = new Chess()
        let lessonMirror = new Chess()
        const startPos = lessonMirror.fen();
        console.log({ currentOpening })
        // TODO: Change hardcoded 0 with lesson #
        lesson.load_pgn(currentOpening.lessons[0].pgn)
        console.log({ pgn: lesson.pgn(), loadedPgnStr: currentOpening.lessons[0].pgn, comments: lesson.get_comments() })
        // TODO: Find out if  the library is reading the PGN correctly
        let positions = lesson.history().map(move => {
            lessonMirror.move(move);
            return { move, fen: lessonMirror.fen() };
        });


        positions = [startPos, ...positions];

        console.log({ expectedPositions: positions })
        setExpectedPositions(positions)
    }

    // effect to load move when user is learning as black
    useEffect(() => {
        if (chess && chess.history().length === 0 && expectedPositions && expectedPositions.length > 0 &&
            currentOpening[0].orientation === "black") {
            console.log({ MOVES: chess.history(), })
            console.log({ expectedPositions })
            moveToNextPosition([expectedPositions[1]])
        }

    }, [chess, expectedPositions])


    const handleNextMove = () => {

        if (fen) {
            let expectedMove = false
            let completedLesson = false
            let move = [] // move will be an array of possible moves! 
            if (expectedPositions) {
                console.log({ expectedPositions })
                expectedPositions.forEach((position, i) => {
                    if (position.fen === fen) {
                        expectedMove = true
                        if ((i + 1) === expectedPositions.length) {
                            completedLesson = true
                        }
                        move = expectedPositions[i + 1]
                    }
                })
                if (expectedMove) {
                    console.log("moving in expectedMove")
                    // SI TURNO DEL USER, MOVE WITH OPENING
                    if (userColor.charAt(0) !== chess.turn()) {
                        if (move) {
                            moveToNextPosition([move])
                        }
                    }
                    if (completedLesson) {
                        alert("success!")
                    }
                }
            }
        }
    }
    useEffect(() => {
        handleNextMove()
    }, [fen])


    // move to the next Fen in opening. Next move stored in position.nextMove
    const moveToNextPosition = (position) => {
        if (position && position[0] && chess && chess.moves().length > 0) {

            const moves = chess.moves({ verbose: true })
            const move = moves.find((mv) => mv.san === position[0].move)
            if (moves.length > 0) {

                console.log({ move, gameFuture })
                if (move && move.san) {
                    chess.move(move.san)
                    setLastMove([move.from, move.to])
                    setFen(chess.fen())
                }
            }
        }
    }
    const onMove = (from, to) => {
        console.log ("ONMOVE CALLED MATE")
        const moves = chess.moves({ verbose: true })
        for (let i = 0, len = moves.length; i < len; i++) { /* eslint-disable-line */
            if (moves[i].flags.indexOf("p") !== -1 && moves[i].from === from) {
                setPendingMove([from, to])
                setSelectVisible(true)
                return
            }
        }
        if (chess.move({ from, to, promotion: "x" })) {
            setLastMove([from, to])
            setFen(chess.fen())
        
        }
    }


    const promotion = e => {
        const from = pendingMove[0]
        const to = pendingMove[1]
        chess.move({ from, to, promotion: e })
        setLastMove([from, to])
        setSelectVisible(false)
        setTimeout(randomMove, 500)
    }

    const turnColor = () => {
        return chess.turn() === "w" ? "white" : "black"
    }

    const calcMovable = () => {
        const dests = new Map()
        chess.SQUARES.forEach(s => {
            const ms = chess.moves({ square: s, verbose: true })
            if (ms.length) dests.set(s, ms.map(m => m.to))
        })
        return {
            free: false, dests, color: userColor
        }
    }

    return { chess, fen, lastMove, turnColor, onMove, calcMovable, userColor, flipBoard }
}

