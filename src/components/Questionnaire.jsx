import { fundMatches } from '../data/fundMatches';
const Questionnaire = ({ answers, setAnswers, showResult, setShowResult }) => {
  const riskTolerance = answers[2]; // still assumes third answer is risk tolerance
  const fund = fundMatches[riskTolerance];

  const handleAnswer = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    setShowResult(true);
  };

  if (showResult) {
    if (!fund) {
      return <p>No matching fund found. Please try different answers.</p>;
    }

    return (
      <div className="result-card">
        <h2>{fund.name}</h2>
        <p>{fund.description}</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Questionnaire</h2>
      <div>
        <label>Question 1: </label>
        <input type="text" onChange={(e) => handleAnswer(0, e.target.value)} />
      </div>
      <div>
        <label>Question 2: </label>
        <input type="text" onChange={(e) => handleAnswer(1, e.target.value)} />
      </div>
      <div>
        <label>Risk Tolerance (index 0-2): </label>
        <input type="number" onChange={(e) => handleAnswer(2, parseInt(e.target.value))} />
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Questionnaire;
