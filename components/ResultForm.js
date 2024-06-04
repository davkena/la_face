// components/ResultForm.js
import { useState } from 'react';

const ResultForm = ({ result = {}, onSuccess }) => {
  // Ensure result is not null or undefined
  const [score, setScore] = useState(result?.score || 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Assume saveResult is a function to save the result
    try {
      await saveResult({ ...result, score });
      onSuccess();
    } catch (error) {
      console.error('Error saving result:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Score:</label>
        <input
          type="number"
          value={score}
          onChange={(e) => setScore(e.target.value)}
          required
        />
      </div>
      <button type="submit">Save Result</button>
    </form>
  );
};

export default ResultForm;