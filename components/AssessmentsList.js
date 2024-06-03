// components/AssessmentsList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AssessmentsList = () => {
  const [assessments, setAssessments] = useState([]);

  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        const response = await axios.get('/api/assessments');
        setAssessments(response.data);
      } catch (error) {
        console.error('Error fetching assessments:', error);
      }
    };

    fetchAssessments();
  }, []);

  return (
    <div>
      <h2>Assessments List</h2>
      <ul>
        {assessments.map((assessment) => (
          <li key={assessment.test_id}>{assessment.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default AssessmentsList;