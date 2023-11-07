import React, { useState, useEffect } from 'react';
import './SurveyResponseList.css'
const SurveyResponseList = () => {
  const [responses, setResponses] = useState([]);
  
  useEffect(() => {
    async function fetchResponses() {
      try {
        const response = await fetch('/api/form/getSurveyResponses');
        if (response.status === 200) {
          const data = await response.json();
          setResponses(data.data);
        } else {
          console.error('Failed to fetch responses');
        }
      } catch (error) {
        console.error('Fetch responses error:', error);
      }
    }

    fetchResponses();
  }, []);

  return (
    <div class="ResponseList">
      <h2>Response List</h2>
      {responses.length === 0 ? (
        <p>No responses available.</p>
      ) : (
        <ul>
          {responses.map((response) => (
            <li key={response._id}>
              <h3>Survey Title: {response.title}</h3>
              <p>Respondent Name: {response.name}</p>
              <p>Respondent Email: {response.email}</p>
              <p>Respondent Phone Number: {response.phoneNumber}</p>
              <p>Response Date: {response.createdAt}</p>
              <h4>Questions and Responses:</h4>
              <ul>
                {response.questions.map((question, questionIndex) => (
                  <li key={questionIndex}>
                    <p>Question: {question.text}</p>
                    <p>Response: {question.response}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SurveyResponseList;
