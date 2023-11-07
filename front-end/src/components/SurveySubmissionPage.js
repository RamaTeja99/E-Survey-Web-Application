// SurveySubmissionPage.js 

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams ,Link} from 'react-router-dom';
import './SurveySubmissionPage.css'

const SurveySubmissionPage = () => {
  const { formId } = useParams(); // Extract the formId from the URL parameters
  const [survey, setSurvey] = useState(null);

  useEffect(() => {
    // Fetch survey data when the component mounts
    fetchSurveyData();
  }, []);

  const fetchSurveyData = async () => {
    try {
      // Fetch the survey data based on the formId
      const response = await axios.get(`http://localhost:8080/form/getSurveyData/${formId}`);
      const surveyData = response.data.data;
      setSurvey(surveyData);
    } catch (error) {
      console.error('Error fetching survey data:', error);
    }
  };

  const SubmitSurveyForm = ({ formId, questions }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [responses, setResponses] = useState(Array(questions.length).fill(''));

    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const response = {
          formId,
          name,
          email,
          answers: responses,
        };

        // Send the response data to the server
        const submitResponse = await axios.post('http://localhost:8080/form/submitResponse', response);

        // Handle success or error as needed
        console.log('Response submitted:', submitResponse.data);
      } catch (error) {
        console.error('Error submitting response:', error);
      }
    };

    const handleResponseChange = (questionIndex, event) => {
      const updatedResponses = [...responses];
      updatedResponses[questionIndex] = event.target.value;
      setResponses(updatedResponses);
    };

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

          {questions.map((question, index) => (
            <div key={index}>
              <label>Question {index + 1}:</label>
              <p>{question.text}</p>
              {question.type === 'text' ? (
                <input
                  type="text"
                  value={responses[index] || ''}
                  onChange={(event) => handleResponseChange(index, event)}
                />
              ) : (
                <select
                  value={responses[index] || ''}
                  onChange={(event) => handleResponseChange(index, event)}
                >
                  <option value="">Select an option</option>
                  {question.options.map((option, optionIndex) => (
                    <option key={optionIndex} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              )}
            </div>
          ))}

          <button type="submit">Submit Response</button>
        </form>
      </div>
    );
  };

  return (
    <div className='Submission'>
      <h2>Survey Submission Page for Form ID: {formId}</h2>
      <Link to="/dashboard" className="back-button">Back to Dashboard</Link> 
      {survey ? (
        <div>
          <h3>{survey.title}</h3>
          <p>{survey.description}</p>
          <SubmitSurveyForm formId={formId} questions={survey.questions} />
        </div>
      ) : (
        <p>Loading survey data...</p>
      )}
    </div>
  );
};

export default SurveySubmissionPage;
