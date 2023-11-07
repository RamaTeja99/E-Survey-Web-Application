import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button, TextField, Typography, Container, Grid, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import './Survey.css'
const AddSurvey = () => {
  const history = useHistory(); 
const [title, setTitle] = useState('');
const [description, setDescription] = useState('');
const [questions, setQuestions] = useState([{ text: '', type: 'text', options: [] }]);



const handleSubmit = async (event) => {
  event.preventDefault();
  const surveyData = {
    userId: "6538ac3beb259e47ce3c62ae",
    email: "example@example.com",
    name: "John Doe",
    title,
    description,
    phoneNumber: 1234567890,
    questions: questions.map(question => ({
      text: question.text,
      type: question.type,
      options: (question.type === 'options')
        ? question.options.filter(option => option.trim() !== '') // Remove empty options
        : [], // Send an empty array for text questions
    })),
  };
  console.log('Survey submitted with data:', surveyData);

  // Send the survey data to your API
  try {
    const response = await axios.post('http://localhost:8080/form/addForm', surveyData);
    history.push('/dashboard');
  } catch (error) {
    console.error('Error sending survey data to the server:', error);
  }
};


  const handleQuestionChange = (index, event) => {
    const values = [...questions];
    values[index][event.target.name] = event.target.value;
    setQuestions(values);
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { text: '', type: 'text', options: [] }]);
  };

  const handleAddOption = (questionIndex) => {
    const values = [...questions];
    values[questionIndex].options.push('');
    setQuestions(values);
  };

  const handleOptionChange = (questionIndex, optionIndex, event) => {
    const values = [...questions];
    values[questionIndex].options[optionIndex] = event.target.value;
    setQuestions(values);
  };

  return (
    <div className='SurveyForm'>
    <Container>
      <Button
        component={Link}
        to="/dashboard"
        startIcon={<ArrowBackIcon />}
        variant="outlined"
        color="primary"
        style={{ position: 'absolute', left: '10px', top: '10px' }}
      >
        Back
      </Button>
      <Typography variant="h4" align="center">Add a New Survey</Typography>
      <div className="scrollable-form">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField fullWidth label="Title" value={title} onChange={(event) => setTitle(event.target.value)}
             inputProps={{ style: { color: 'white' } }} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Description" value={description} onChange={(event) => setDescription(event.target.value)} 
             inputProps={{ style: { color: 'white' } }}/>
          </Grid>
          {questions.map((question, questionIndex) => (
            <Grid item xs={12} key={questionIndex}>
              <TextField fullWidth label="Question Text" name="text" value={question.text} onChange={(event) => handleQuestionChange(questionIndex, event)} 
               inputProps={{ style: { color: 'white' } }}/>
              <Select
                fullWidth
                label="Question Type"
                name="type"
                value={question.type}
                onChange={(event) => handleQuestionChange(questionIndex, event)}
              >
                <MenuItem value="text">Text</MenuItem>
                <MenuItem value="options">Options</MenuItem>
              </Select>

              {question.type === 'options' && (
                <Grid container spacing={3}>
                  {question.options.map((option, optionIndex) => (
                    <Grid item xs={12} key={optionIndex}>
                      <TextField
                        fullWidth
                        label="Option"
                        value={option}
                        onChange={(event) => handleOptionChange(questionIndex, optionIndex, event)}
                        inputProps={{ style: { color: 'white' } }}
                      />
                    </Grid>
                  ))}
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleAddOption(questionIndex)}
                    >
                      Add Option
                    </Button>
                  </Grid>
                </Grid>
              )}
            </Grid>
          ))}
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleAddQuestion}>Add Question</Button>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">Submit</Button>
          </Grid>
        </Grid>
      </form>
      </div>
    </Container>
    </div>
  );
};

export default AddSurvey;
