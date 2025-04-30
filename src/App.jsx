// src/App.jsx
import { useState } from 'react';
import Questionnaire from './components/Questionnaire';

function App() {
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  return (
    <div className="App" style={{ padding: 24, fontFamily: 'sans-serif' }}>
      <h1>Fund Navigator AI</h1>
      <Questionnaire
        questions={questions}             // we’ll import this inside Questionnaire
        answers={answers}
        setAnswers={setAnswers}
        showResult={showResult}
        setShowResult={setShowResult}
      />
    </div>
  );
}

export default App;
