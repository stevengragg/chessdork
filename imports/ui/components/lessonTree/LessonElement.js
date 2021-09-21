import React from 'react'
import { LessonMenu } from './LessonMenu'
import { useState, useEffect, useRef } from "react"
import { Modal } from "../common/Modal"
import useClickOutside from "../../hooks/useClickOutside"
import Tooltip from "../common/Tooltip"
import useHover from "../../hooks/useHover"
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export const LessonElement = ({ level }) => {
    const [hoverRef, isHovering] = useHover()
    const [menu, setMenu] = useState(false)
    const [progress, setProgress] = useState(0)

    const clickRef = useRef();
    useClickOutside(clickRef, () => { if (menu) setMenu(false) });
    useEffect(() => {
        if (level) {
            setProgress((level.variationsFinished.length === 0 && level.variationIds.length === 0) ? 0 :
                (100 * (level.variationsFinished.length / level.variationIds.length)))
        }
    }, [level])
    console.log ({level})
    const handleElementClick = ()=>{
        if (level ){
            setMenu(!menu)
        }
    }
    return (
        <div className="relative" >

            {isHovering && level.active && <Tooltip message={`${level.variationsFinished.length} of ${level.variationIds.length} variations learned`} />}
            <div ref={hoverRef} onClick={() => handleElementClick()}>
                <div className={`w-28 h-28 mb-3 cursor-pointer `}>
                    <CircularProgressbarWithChildren
                        styles={buildStyles({pathColor: `rgba(28,175,246, ${progress})`,})} valueStart={0} value={progress}>
                        <div style={{ padding: "2.4rem" }} className={`relative   rounded-full ${level.active===false? "bg-blueGray-300": level.orientation === "white" ? "bg-amber-400" : "bg-teal-500"}`}>
                            {level.icon && <img style={{ top: "15%", right: "15%" }} className={`absolute ${menu && "animate-wiggle"} hover:animate-wiggle top-1/4 right-1/4 h-14 w-14`} src={`/images/lessonIcons/${level.icon}.svg`} />}
                        </div>
                    </CircularProgressbarWithChildren>
                </div>
                <div className="absolute w-28 cursor-pointer flex justify-center  ">
                    <span className=" font-black text-md">
                        {level && level.name}
                    </span>
                </div>
            </div >

            <Modal dropdownRef={clickRef} isToggled={menu}>
                <LessonMenu level={level} menuOpen={menu} />
            </Modal>
        </ div>
    )
}
