import React, { useState } from 'react';

const CreateSurvey = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');

  const handleAddQuestion = () => {
    if (newQuestion.trim() === '') {
      return;
    }
    setQuestions([...questions, newQuestion]);
    setNewQuestion('');
  };

  const handleRemoveQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  const handleCreateSurvey = async () => {
    try {
      const surveyData = {
        title,
        description,
        questions,
      };

      const response = await fetch('/api/form/addForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(surveyData),
      });

      if (response.status === 200) {
        // Survey created successfully
        // You can redirect to a success page or perform other actions
        console.log('Survey created successfully');
      } else {
        console.error('Failed to create survey');
        // Handle the error, e.g., show an error message
      }
    } catch (error) {
      console.error('Create survey error:', error);
      // Handle the error, e.g., show an error message
    }
  };

  return (
    <div>
      <h2>Create Survey</h2>
      <form>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Questions:</label>
          <ul>
            {questions.map((question, index) => (
              <li key={index}>
                {question}
                <button onClick={() => handleRemoveQuestion(index)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <input
            type="text"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
          />
          <button onClick={handleAddQuestion}>Add Question</button>
        </div>
        <button type="button" onClick={handleCreateSurvey}>
          Create Survey
        </button>
      </form>
    </div>
  );
};

export default CreateSurvey;
