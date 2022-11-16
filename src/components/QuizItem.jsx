import React, { useState } from "react"

export default function QuizItem(props) {
    const [selectedAns, setSelectedAns] = useState("")

    function handleClick(input) {
        props.selectAnswer()
        setSelectedAns(input)
    }
    
    function styleButton(answer) {
        let style;
        if (!props.isCompleted) {
            style = selectedAns == answer ? "answer-selected" : ""   
        } else {
            switch (true) {
                case answer == props.correctAnswer:
                    style = "answer-correct";
                    break;
                case selectedAns == answer && answer != props.correctAnswer:
                    style = "answer-incorrect"
                    break;
                default:
                    style = ""
            }  
        }
        return style
    }

    return (
        <article className="quiz-item">
            <h2 className="quiz-question">{props.question}</h2>
            <ul className="quiz-answers">
                {props.allAnswers.map((answer, idx) => {
                    return (
                        <li key={idx}>
                            <button
                                value={answer}
                                onClick={() => handleClick(answer)}
                                className={styleButton(answer)}
                                disabled={props.isCompleted}
                            >{answer}</button>
                        </li>
                    )
                }
                )}
            </ul>
        </article>
    )
}

