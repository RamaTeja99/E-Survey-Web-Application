import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './SurveySubmissionPage.css';

const SurveySubmissionPage = () => {
  const { formId } = useParams();
  const [survey, setSurvey] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(''); // Added phoneNumber state
  const [responses, setResponses] = useState({});

  useEffect(() => {
    fetchSurveyData();
  }, []);

  const fetchSurveyData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/form/getSurveyData/${formId}`);
      const surveyData = response.data.data;
      setSurvey(surveyData);
    } catch (error) {
      console.error('Error fetching survey data:', error);
    }
  };

  const handleResponseChange = (questionId, event) => {
    const updatedResponses = { ...responses, [questionId]: event.target.value };
    setResponses(updatedResponses);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = {
        formId,
        name,
        email,
        phoneNumber, // Include phoneNumber in the response
        answers: Object.values(responses), // Extract values from the responses object
      };

      // Send the response data to the server
      const submitResponse = await axios.post('http://localhost:8080/form/submitResponse', response, {
        headers: {
          'Content-Type': 'application/json', // Set the content type header
        },
      });

      // Handle success or error as needed
      console.log('Response submitted:', submitResponse.data);
    } catch (error) {
      console.error('Error submitting response:', error);
    }
  };

  return (
    <div className="Submission">
      <h2>Survey Submission Page for Form ID: {formId}</h2>
      <Link to="/dashboard" className="back-button">
        Back to Dashboard
      </Link>
      {survey ? (
        <div>
          <h3>{survey.title}</h3>
          <p>{survey.description}</p>
          <form onSubmit={handleSubmit}>
            <label>Name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

            <label>Email:</label>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />

            <label>Phone Number:</label>
            <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />

            {survey.questions.map((question) => (
              <div key={question._id}>
                <label>Question:</label>
                <p>{question.text}</p>
                {question.type === 'text' ? (
                  <input
                    type="text"
                    value={responses[question._id] || ''}
                    onChange={(event) => handleResponseChange(question._id, event)}
                  />
                ) : (
                  <select
                    value={responses[question._id] || ''}
                    onChange={(event) => handleResponseChange(question._id, event)}
                  >
                    <option value="">Select an option</option>
                    {question.options.map((option) => (
                      <option key={option} value={option}>
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
      ) : (
        <p>Loading survey data...</p>
      )}
    </div>
  );
};

export default SurveySubmissionPage;
