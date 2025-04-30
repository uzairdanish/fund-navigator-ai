import React from 'react'
import questions from '../data/questions'
import { fundMatches } from '../data/fundMatches'
import './Questionnaire.css'

const Questionnaire = ({ answers, setAnswers, showResult, setShowResult }) => {
  // update one answer in the array
  const handleAnswer = (index, value) => {
    const next = [...answers]
    next[index] = value
    setAnswers(next)
  }

  // when you hit Submit
  const handleSubmit = (e) => {
    e.preventDefault()
    setShowResult(true)
  }

  // reset everything to start again
  const handleReset = () => {
    setAnswers([])
    setShowResult(false)
  }

  // figure out your fund
  const chosen = questions.find(q => q.id === 'risk')
  const riskAnswer = answers[questions.length - 1]
  const fund = fundMatches[riskAnswer]

  if (showResult) {
    if (!fund) {
      return (
        <div className="no-match">
          No matching fund found. Please try different answers.
          <button className="start-over-btn" onClick={handleReset}>
            Start Over
          </button>
        </div>
      )
    }
    return (
      <div className="result-card">
        <h2>{fund.name}</h2>
        <p>{fund.description}</p>
        <a href={fund.url} target="_blank" rel="noopener">
          Learn more
        </a>
        <button className="start-over-btn" onClick={handleReset}>
          Start Over
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="quiz-form">
      <div className="progress">
        Question {answers.filter(a => a != null).length + 1} of {questions.length}
      </div>
      {questions.map((q, i) => (
        <fieldset key={q.id} disabled={i !== answers.filter(a => a != null).length}>
          <legend>{q.text}</legend>
          <div className="options">
            {q.options.map(opt => (
              <label key={opt}>
                <input
                  type="radio"
                  name={q.id}
                  value={opt}
                  checked={answers[i] === opt}
                  onChange={() => handleAnswer(i, opt)}
                  required
                />
                {opt}
              </label>
            ))}
          </div>
        </fieldset>
      ))}
      <button type="submit" disabled={answers.length < questions.length} className="submit-btn">
        Submit
      </button>
    </form>
  )
}

export default Questionnaire