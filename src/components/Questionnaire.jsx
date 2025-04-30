// src/components/Questionnaire.jsx
import React from 'react';
import { questions } from '../data/questions';
import { fundMatches } from '../data/fundMatches';

const Questionnaire = ({
  answers,
  setAnswers,
  showResult,
  setShowResult,
}) => {
  // update one answer
  const handleAnswer = (key, value) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
  };

  // on submit, reveal the result
  const handleSubmit = () => {
    setShowResult(true);
  };

  // once they’ve submitted, pick the fund by their risk tolerance
  if (showResult) {
    const fund = fundMatches[answers.risk];
    if (!fund) {
      return <p>No matching fund found. Please try different answers.</p>;
    }
    return (
      <div className="result-card" style={{
        border: '1px solid #ccc', padding: 16, borderRadius: 8, marginTop: 24
      }}>
        <h2>{fund.name}</h2>
        <p>{fund.description}</p>
        <a
          href={fund.link}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'inline-block', marginTop: 12, color: '#0066cc' }}
        >
          View Fund Details →
        </a>
      </div>
    );
  }

  // otherwise show the form
  return (
    <div style={{ marginTop: 24 }}>
      {questions.map(({ id, key, text, options }) => (
        <div key={id} style={{ marginBottom: 16 }}>
          <label htmlFor={key} style={{ display: 'block', marginBottom: 4 }}>
            {text}
          </label>
          <select
            id={key}
            value={answers[key] || ''}
            onChange={e => handleAnswer(key, e.target.value)}
            style={{ padding: 8, width: '100%', maxWidth: 320 }}
          >
            <option value="" disabled>
              Select…
            </option>
            {options.map(opt => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      ))}

      <button
        onClick={handleSubmit}
        disabled={questions.some(q => !answers[q.key])}
        style={{
          padding: '10px 20px',
          background: '#004a7c',
          color: '#fff',
          border: 'none',
          borderRadius: 4,
          cursor: 'pointer'
        }}
      >
        See My Fund Match
      </button>
    </div>
  );
};

export default Questionnaire;
