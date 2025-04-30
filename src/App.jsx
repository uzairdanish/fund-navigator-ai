import { useState } from 'react';
import Questionnaire from './components/Questionnaire';

function App() {
  // one answer per question
  const [answers, setAnswers] = useState(Array(3).fill(''));
  const [showResult, setShowResult] = useState(false);

  return (
    <div className="App">
      <h1>Fund Navigator AI</h1>
      <Questionnaire
        answers={answers}
        setAnswers={setAnswers}
        showResult={showResult}
        setShowResult={setShowResult}
      />
    </div>
  );
}

export default App;