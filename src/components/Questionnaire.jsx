import React from 'react';
import questions from '../data/questions';
import { fundMatches } from '../data/fundMatches';
import './Questionnaire.css';    // ← this line loads all of your Questionnaire styles

const Questionnaire = ({ answers, setAnswers, showResult, setShowResult }) => {
  // update a single answer
  const handleAnswer = (index, value) => {
    const next = [...answers];
    next[index] = value;
    setAnswers(next);
  };

  // submit quiz
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowResult(true);
  };

  // reset everything
  const handleReset = () => {
    setAnswers([]);
    setShowResult(false);
  };

  // show the result card
  if (showResult) {
    const risk = answers[2];               // your risk‐tolerance is Q3
    const fund = fundMatches[risk];

    if (!fund) {
      return (
        <div className="result-card">
          <p className="no-match">
            No matching fund found.<br/>
            Please go back and try different answers.
          </p>
          <button className="start-over-btn" onClick={handleReset}>
            Start Over
          </button>
        </div>
      );
    }

    return (
      <div className="result-card">
        <h2 className="fund-name">{fund.name}</h2>
        <p className="fund-desc">{fund.description}</p>
        <a
          className="learn-more"
          href={fund.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn more
        </a>
        <button className="start-over-btn" onClick={handleReset}>
          Start Over
        </button>
      </div>
    );
  }

  // otherwise, render the quiz form
  return (
    <form className="questionnaire-form" onSubmit={handleSubmit}>
      {questions.map((q, i) => (
        <div key={i} className="question-block">
          <label className="question-label">{q.text}</label>
          <select
            className="question-select"
            value={answers[i] || ''}
            onChange={(e) => handleAnswer(i, e.target.value)}
            required
          >
            <option value="" disabled>
              Choose…
            </option>
            {q.options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      ))}
      <button type="submit" className="submit-btn">
        Submit
      </button>
    </form>
  );
};

export default Questionnaire;