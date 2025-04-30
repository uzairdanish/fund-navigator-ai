import React from 'react';
import { questions }   from '../data/questions';
import { fundMatches } from '../data/fundMatches';

const Questionnaire = ({ answers, setAnswers, showResult, setShowResult }) => {
  // update one answer
  const handleAnswer = (idx, value) => {
    const copy = [...answers];
    copy[idx] = value;
    setAnswers(copy);
  };

  // on submit, show the result
  const handleSubmit = e => {
    e.preventDefault();
    setShowResult(true);
  };

  // before submission: render the form
  if (!showResult) {
    return (
      <form onSubmit={handleSubmit}>
        {questions.map((q, idx) => (
          <div key={q.id} style={{ marginBottom: '1rem' }}>
            <label>
              <strong>{q.text}</strong>
            </label>
            <br />
            <select
              value={answers[idx]}
              onChange={e => handleAnswer(idx, e.target.value)}
              required
            >
              <option value="">— Select —</option>
              {q.options.map(opt => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        ))}

        <button type="submit">Submit</button>
      </form>
    );
  }

  // after submit: pick the fund by the risk answer (third question)
  const riskKey = answers[2];
  const fund    = fundMatches[riskKey];

  if (!fund) {
    return <p>No matching fund found. Please try different answers.</p>;
  }

  return (
    <div className="result-card" style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>{fund.name}</h2>
      <p>{fund.description}</p>
      <a href={fund.url} target="_blank" rel="noopener noreferrer">
        Learn more
      </a>
    </div>
  );
};

export default Questionnaire;