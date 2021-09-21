import React, { useState, useEffect } from 'react'
import { LessonElement } from './LessonElement'
import { CourseCollection } from '../../../api/course';
import { useTracker } from 'meteor/react-meteor-data'
import useCourse from '../../hooks/useCourse';


// TODO: use user subscription to show user's tree
// TODO: Every chapter has a place in the tree (in the database!!)
const LessonTree = () => {
    const [renderLevels, setRenderLevels] = useState()
    const {course}  = useCourse()

    useEffect(() => {
        if (course && course.length > 0) {
            var maxLevel = course[0].levels.reduce((a, b) => a.treePosition > b.treePosition ? a : b).treePosition;
            let renderLevels = new Array(maxLevel)
            course[0].levels.forEach((node) => {
                if (renderLevels[node.treePosition - 1]) {
                    renderLevels[node.treePosition - 1].push(node)
                }
                else {
                    renderLevels[node.treePosition - 1] = []
                    renderLevels[node.treePosition - 1].push(node)
                }
            }
            )
            setRenderLevels(renderLevels)
        }
    }, [JSON.stringify(course)])
    return (
        <div>
            {renderLevels && renderLevels.length > 0 ?
                <>
                    {renderLevels.map((level) => {
                        console.log({ level })
                        if (level) {
                            return (
                                <div className="flex justify-center space-x-12 md:space-x-16 mb-16">
                                    {level && level.length > 0 &&
                                        level.map((opening) => (
                                            <LessonElement level={opening} />
                                        ))}
                                </div>
                            )
                        }
                    })}

                </>
                :
                <span>Load</span>
            }
        </div>
    )
}
export default LessonTree