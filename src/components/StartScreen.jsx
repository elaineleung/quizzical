import React from "react"

export default function StartScreen({ handleStart }) {
    return(
        <header className="quiz-start">
            <h1>Quizzical</h1>
            <p>Test your knowledge of general trivia by answering these questions!</p>
            <button className="btn" onClick={handleStart}>Start quiz</button>
        </header>
    )
}