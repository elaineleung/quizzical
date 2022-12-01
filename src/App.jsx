import React, { useState } from "react"
import StartScreen from "./components/StartScreen"
import QuizScreen from "./components/QuizScreen"
import Loader from "./components/Loader"
import Footer from "./components/Footer"

const NUMBER_OF_ITEMS = 5
const NUMBER_OF_CHOICES = 4

export default function App() {
  const [isGameStarted, setIsGameStarted] = useState(false)
  const [quizData, setQuizData] = useState(getQuizData)

  function getQuizData() {
    fetch(`https://opentdb.com/api.php?amount=${NUMBER_OF_ITEMS}&category=9&type=multiple`)
      .then(res => res.json())
      .then(data => {

        data.results.map(item => {
          const allAnswers = item.incorrect_answers
          const num = Math.floor(Math.random() * NUMBER_OF_CHOICES)
          allAnswers.splice(num, 0, item.correct_answer)
          item.all_answers = allAnswers
          return item
        })
        setQuizData(data.results)
      })
  }


  function handleStart() {
    setIsGameStarted(true)
  }

  return (
    <div className="app-content">
      <div className="main-content">
        {!isGameStarted
          ? <StartScreen handleStart={handleStart} />
          : (!quizData?.length)
            ? <Loader />
            : <QuizScreen
                getQuizData={getQuizData} 
                quizData={quizData}
                numOfItems={NUMBER_OF_ITEMS}
                setQuizData={setQuizData}
              />
        }
      </div>

      {!isGameStarted || quizData?.length !== 0 ? <Footer /> : null}
    </div>
  )
}