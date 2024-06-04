// components/AssessmentForm.js
import { useState } from 'react';
import axios from 'axios';

const AssessmentForm = ({ assessment = {}, onSuccess }) => {
  const [title, setTitle] = useState(assessment.title || '');
  const [questions, setQuestions] = useState(JSON.stringify(assessment.questions || []));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const assessmentData = {
      title,
      questions: JSON.parse(questions),
    };

    try {
      if (assessment.test_id) {
        // Update existing assessment
        await axios.put(`/api/assessments/update/${assessment.test_id}`, assessmentData);
      } else {
        // Create new assessment
        await axios.post('/api/assessments/create', assessmentData);
      }
      setTitle('');
      setQuestions('[]');
      onSuccess();
    } catch (error) {
      console.error('Error submitting the assessment form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="questions">Questions (JSON format):</label>
        <textarea
          id="questions"
          value={questions}
          onChange={(e) => setQuestions(e.target.value)}
        />
      </div>
      <button type="submit">Save Assessment</button>
    </form>
  );
};

export default AssessmentForm;