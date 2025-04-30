import { useState } from 'react';
import Questionnaire from './components/Questionnaire';

function App() {
  const [answers, setAnswers] = useState([]);
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
