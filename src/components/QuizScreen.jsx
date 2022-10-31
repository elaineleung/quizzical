import React, { useState } from "react"
import { decode } from 'html-entities'
import QuizItem from "./QuizItem"

export default function QuizScreen(props) {
    const [selected, setSelected] = useState(new Array(5).fill(null))
    const [completed, setCompleted] = useState(false)
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
        setCompleted(true)
        const points = selected.reduce((acc, cur, idx) => {
            return cur == props.quizData[idx].correct_answer ? acc + 1 : acc
        }, 0)
        setScore(points)
    }

    function newGame() {
        setCompleted(false)
        props.getQuizData()
    }
    // function parseString(string) {
    //     return string.replace(/&quot;/g, '"').replace(/&#039;/g, "'")
    // }

    const quizContent = props.quizData.map((item, idx) => (
        <QuizItem
            key={idx}
            question={decode(item.question)}
            correctAnswer={decode(item.correct_answer)}
            allAnswers={item.all_answers.map(ans => decode(ans))}
            selectAnswer={() => selectAnswer(event, idx)}
            completed={completed}
        />
    ))

    return (
        <main className="quiz-content">
            <div className="quiz-items">{quizContent}</div>
            <div className="quiz-footer">
                {!completed ? (
                    <button onClick={checkAnswers} className="btn">Check answers</button>
                ) : (
                        <>
                            <span className="quiz-footer__text">You scored {score}/5 correct answers</span>
                            <button onClick={newGame} className="btn">Play again</button>
                        </>
                    )}
            </div>
        </main>
    )
}