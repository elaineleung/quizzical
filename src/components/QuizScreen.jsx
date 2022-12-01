import React, { useState } from "react"
import { decode } from 'html-entities'
import QuizItem from "./QuizItem"

export default function QuizScreen(props) {
    const [selected, setSelected] = useState(new Array(props.numOfItems).fill(""))
    const [isCompleted, setIsCompleted] = useState(false)
    const [score, setScore] = useState(0)

    function selectAnswer(event, index) {
        const { value } = event.target
        setSelected(prevState => {
            return prevState.map((item, idx) => {
                return idx === index ? value : item
            })
        })
    }

    function checkAnswers() {
        setIsCompleted(true)
        const points = selected.reduce((acc, cur, idx) => {
            return cur == props.quizData[idx].correct_answer ? acc + 1 : acc
        }, 0)
        setScore(points)
    }

    function newGame() {
        setIsCompleted(false)
        props.getQuizData()
        props.setQuizData([])
    }


    const quizContent = props.quizData.map((item, idx) => (
        <QuizItem
            key={idx}
            question={decode(item.question)}
            correctAnswer={decode(item.correct_answer)}
            allAnswers={item.all_answers.map(answer => decode(answer))}
            selectAnswer={() => selectAnswer(event, idx)}
            isCompleted={isCompleted}
        />
    ))

    return (
        <main className="quiz-content">
            <div className="quiz-items">{quizContent}</div>
            <div className="quiz-footer">
                {!isCompleted ? (
                    <button onClick={checkAnswers} className="btn">Check answers</button>
                ) : (
                        <>
                            <span className="quiz-footer__text">You scored {score}/{props.numOfItems} correct answers</span>
                            <button onClick={newGame} className="btn">Play again</button>
                        </>
                    )}
            </div>
        </main>
    )
}