
const randomMove = () => {
    const moves = chess.moves({ verbose: true })
    console.log({ moves })
    const move = moves[Math.floor(Math.random() * moves.length)]
    console.log({ move })
    if (moves.length > 0) {
        chess.move(move.san)
        setLastMove([move.from, move.to])
        setFen(chess.fen())
    }
}
export const getNags = (nagCode, nagArray) => {
    let nags = []
    nagCode.forEach((nag, i) => {
        let nagPos = parseInt(nag.replace("$", ""))
        nags[i] = nagArray[nagPos]

    })
    return nags
}

// // UTILS FROM THE PGNVJS LIBRARY

export const getShapes = (commentDiag)=> {
    function colOfDiag(color) {
        const colors = { Y: 'yellow', R: 'red', B: 'blue', G: 'green' };
        return colors[color];
    }

    let arr = [];
    if ((commentDiag !== undefined) && (commentDiag !== null)) {
        if (commentDiag.colorArrows) {
            for (let i = 0; i < commentDiag.colorArrows.length; i++) {
                let comm = commentDiag.colorArrows[i];
                arr.push({
                    orig: comm.substring(1, 3),
                    dest: comm.substring(3, 5),
                    brush: colOfDiag(comm.substring(0, 1))
                });
            }
        }
        if (commentDiag.colorFields) {
            for (let i = 0; i < commentDiag.colorFields.length; i++) {
                let comm = commentDiag.colorFields[i];
                arr.push({ orig: comm.substring(1, 3), brush: colOfDiag(comm.substring(0, 1)) });
            }
        }
    }
    return arr;
}
