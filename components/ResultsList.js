// components/ResultsList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const ResultsList = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get('/api/results');
        setResults(response.data);
      } catch (error) {
        console.error('Error fetching results:', error);
      }
    };

    fetchResults();
  }, []);

  return (
    <div>
      <h2>Results List</h2>
      <ul>
        {results.map((result) => (
          <li key={result.result_id}>
            <Link href={`/results/${result.result_id}`}>
              <a>Result ID: {result.result_id}, Score: {result.score}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};


export default ResultsList;