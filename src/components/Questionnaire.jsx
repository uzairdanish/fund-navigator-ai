import React from 'react'
import questions from '../data/questions'
import { fundMatches } from '../data/fundMatches'
import documents from '../data/documents'
import './Questionnaire.css'

const Questionnaire = ({ answers, setAnswers, showResult, setShowResult }) => {
  //  → update one answer in the array
  const handleAnswer = (index, value) => {
    const next = [...answers]
    next[index] = value
    setAnswers(next)
  }

  //  → when you hit Submit
  const handleSubmit = (e) => {
    e.preventDefault()
    setShowResult(true)
  }

  //  → reset everything to start again
  const handleReset = () => {
    setAnswers([])
    setShowResult(false)
  }

  //  → figure out your fund
  const riskAnswer = answers[questions.length - 1]
  const fund = fundMatches[riskAnswer]

  if (showResult) {
    //  No match case
    if (!fund) {
      return (
        <div className="no-match">
          No matching fund found. Please try different answers.
          <button className="btn-link start-over" onClick={handleReset}>
            Start Over
          </button>
        </div>
      )
    }

    //  Results page
    return (
      <div className="results-container">

        {/* 1. Header */}
        <header className="results-header">
          <h2>Your Recommended Fund</h2>
          <p className="subhead">
            Based on your answers, we think this fund fits you best.
          </p>
        </header>

        {/* 2. Fund Card */}
        <section className="fund-card">
          <div className="fund-card-title">
            <h3 className="fund-name">{fund.name}</h3>
            <span className="badge">Top Pick</span>
          </div>
          <p className="fund-desc">{fund.description}</p>
          <button
            className="btn-primary"
            onClick={() => window.open(fund.url, '_blank')}
          >
            View Fund Page
          </button>
        </section>

        {/* 3. Documentation Section */}
        <section className="fund-docs">
          <h4>Fund Documents</h4>
          <ul className="docs-list">
            {documents.map((doc) => (
              <li key={doc.url}>
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noopener"
                  className="doc-link"
                >
                  <span className="icon-pdf">📄</span> {doc.name}
                </a>
              </li>
            ))}
          </ul>
          <p className="disclaimer">
            For informational purposes only. Not investment advice.
          </p>
        </section>

        {/* 4. Next Actions */}
        <section className="cta-row">
          <button className="cta-card">Compare with Other Funds</button>
          <button className="cta-card">Email Me This Result</button>
          <button className="cta-card">Talk to an Advisor</button>
        </section>

        {/* 5. Footer */}
        <footer className="results-footer">
          <button className="btn-link start-over" onClick={handleReset}>
            Start Over
          </button>
          <img
            src="/picton-logo.png"
            alt="Picton Mahoney Logo"
            className="footer-logo"
          />
        </footer>
      </div>
    )
  }

  //  Quiz form
  return (
    <form onSubmit={handleSubmit} className="quiz-form">
      <div className="progress">
        Question {answers.filter((a) => a != null).length + 1} of{' '}
        {questions.length}
      </div>

      {questions.map((q, i) => (
        <fieldset
          key={q.id}
          disabled={i !== answers.filter((a) => a != null).length}
        >
          <legend>{q.text}</legend>
          <div className="options">
            {q.options.map((opt) => (
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

      <button
        type="submit"
        disabled={answers.length < questions.length}
        className="submit-btn"
      >
        Submit
      </button>
    </form>
  )
}

export default Questionnaire