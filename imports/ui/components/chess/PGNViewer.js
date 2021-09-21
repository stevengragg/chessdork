import React, {useLayoutEffect, useEffect, useState} from 'react'
import Children from 'react-children-utilities'
import * as uuid from 'uuid'
// import { pgnView } from '@mliebelt/pgn-viewer'
import { basicPgn , pgnView} from '../../libs/pgn-viewer/src/'
import useScreenSize, { BreakPoint } from '../../hooks/useScreenSize'

const id = 'board-' + uuid.v4()
function PGNViewer({children}) {
  const gameDecription = Children.onlyText(children)
  
  const [layoutMode, setLayoutMode] = useState("left")
  const [width, setWidth] = useState("400px")
  const screenSize = useScreenSize()
  const [base, setBase]= useState()
  useEffect(() => {
      if (screenSize.width<600){
          setLayoutMode("top")
          setWidth ((screenSize.width).toString()+"px")
      }
      else {
          setLayoutMode("left")
          setWidth("400px")
      }
    
  }, [screenSize])
  useEffect(() => {
    const {pgn } = basicPgn(id,
      { pgn: gameDecription, locale: 'en', startPlay: 0, showResult: true, boardSize: width,
                notationLayout: 'list', layout: "top",  showFen: false,
                pieceStyle: 'wikipedia', theme: 'blue', scrollable:true       }
    )
    setBase(pgn)
  },[layoutMode])

 useEffect(()=>{
if (base){
  console.log ({pgnz:base, moves: base.getMoves()})
}
 },[base])

  useLayoutEffect(() => {
      pgnView(id,{ pgn: gameDecription,  timerTime: '1', locale: 'en',
              startPlay: 0, showResult: true, boardSize: width, notationLayout: 'list',
              layout: "top", showFen: false, pieceStyle: 'wikipedia',theme: 'brown', scrollable:true       
      }
    )
  })

  return (
    <div id={id}></div>
  )
}
export default PGNViewer