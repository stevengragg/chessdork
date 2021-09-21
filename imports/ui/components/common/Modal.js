import React from 'react'
import { AnimatePresence, motion } from "framer-motion"
export const Modal = ({ isToggled, children, dropdownRef }) => {
    return (
        <AnimatePresence>

            {isToggled &&
                <motion.div ref ={dropdownRef} className="z-50 relative"
                 initial={{ opacity: 0 , height:0, width:0 }}
                    exit={{ opacity: 0 , height:0 , width:0}}
                    animate={{ opacity: 1 ,height:"auto" , width:"auto", scale: [0.2, 1, 1, 1, 1],
                }}
                >
                    <motion.div initial={{ y: 50 }} exit={{ y: 0 }} animate={{ y: -30 }}
                    >
                        {children}
                    </motion.div>
                </motion.div>

            }
        </AnimatePresence>
    )
}
