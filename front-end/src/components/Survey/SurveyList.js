import React, { useState, useEffect } from 'react';

const SurveyList = () => {
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    async function fetchSurveys() {
      try {
        const response = await fetch('/api/form/getForm');
        if (response.status === 201) {
          const data = await response.json();
          setSurveys(data.data);
        } else {
          console.error('Failed to fetch surveys');
        }
      } catch (error) {
        console.error('Fetch surveys error:', error);
      }
    }

    fetchSurveys();
  }, []);

  return (
    <div>
      <h2>Survey List</h2>
      {surveys.length === 0 ? (
        <p>No surveys available.</p>
      ) : (
        <ul>
          {surveys.map((survey) => (
            <li key={survey._id}>
              <h3>{survey.title}</h3>
              <p>{survey.description}</p>
              <p>Unique Link: {survey.uniqueLink}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SurveyList;
