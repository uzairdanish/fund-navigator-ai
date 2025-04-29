const Questionnaire = ({ answers, showResult }) => {
    // if (!showResult) return null;
    // const riskTolerance = answers[2]; // Use Risk Tolerance for now
    const fund = { name: "Sample Fund", description: "This is a test fund." };
  
  
    if (!fund) {
      return <p>No matching fund found. Please try different answers.</p>;
    }
  
    return (
      <div className="result-card">
        <h2>{fund.name}</h2>
        <p>{fund.description}</p>
      </div>
    );
  };

  export default Questionnaire;

  