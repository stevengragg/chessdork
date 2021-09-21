import React, {useState} from 'react'
import {onBoardingItems} from '../../../../utils/onboarding/questions'

export default Welcome = () => {
    const initialQuestion = onBoardingItems[0]

    console.log(initialQuestion)
    const [question, setQuestion] = useState(initialQuestion)

    console.log(onBoardingItems)

    const continueQuestionHandler = () => { 
        console.log("continue")
        setQuestion(onBoardingItems[(question.sequence - 1) + 1])
    }

    const chosenAnswerHandler = () => { 
       
        console.log("I am clicked")
    }
    return (
        <div className="">
            <div className="bg-blueGray-50  lg:h-screen">
                <div className="mx-auto">
                    <div className="relative">
                        {/* Progress Bar Here */}
                            <h1>{question.question}</h1>
                        {/* Header Question */}

                        {/* Choices */}
                        { question.choices.map(c => 
                            <li key={c.value} onClick={chosenAnswerHandler}>{c.text}</li>
                            
                         )}
                        {/* Continue Button */}
                        <button onClick={continueQuestionHandler}> Continue </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
