import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import LogoImage from './Photos/mk1.jpg';
import SurveyResponseList from './Response/SurveyResponseList'; // Import the SurveyResponseList component
import SubmitSurveyForm from './SurveySubmissionPage.js'; // Import the SubmitSurveyForm component
import './DashBoard.css';

const DashBoard = () => {
  const [forms, setForms] = useState([]);
  const [selectedForm, setSelectedForm] = useState(null);
  const [selectedFormForSubmission, setSelectedFormForSubmission] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    // Fetch the user's name here or use your authentication mechanism
    const user = fetchUserData(); // Replace with your actual code

    // Update the loggedInUser state with the user's name
    setLoggedInUser(user.name);

    // Fetch the forms
    fetchForms();
  }, []);

  const fetchUserData = () => {
    // Replace this with your code to fetch user data
    // For example, if you are using an authentication library, fetch the user data here.
    // For simplicity, I'll return a sample user object.
    return {
      name: 'Charan', // Replace with the actual user's name
    };
  };

  const fetchForms = async () => {
    try {
      const response = await axios.get('http://localhost:8080/form/getForm');
      setForms(response.data.data);
    } catch (error) {
      console.error('Error fetching forms:', error);
    }
  };

  const handleOpenDialog = (form) => {
    setSelectedForm(form);
  };

  const handleCloseDialog = () => {
    setSelectedForm(null);
  };

  const handleDeleteForm = async (title) => {
    try {
      await axios.delete(`http://localhost:8080/form/deleteForm/${title}`);
      // Remove the deleted form from the forms array
      setForms(forms.filter((form) => form.title !== title));
    } catch (error) {
      console.error('Error deleting form:', error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredForms = forms.filter((form) =>
    form.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <AppBar position="static">
        <Toolbar className="Dashboardnavbar">
          <div className="left-buttons">
            <div className="logo">
              <img src={LogoImage} alt="Logo" style={{ width: '60px', height: '60px' }} />
            </div>
            <Button>
              <Link to="/" className="link">
                Home
              </Link>
            </Button>
            <Button>
              <Link to="/plans" className="link">
                Plans
              </Link>
            </Button>
          </div>
          <div className="middle-search-bar">
            <input
              type="text"
              placeholder="Search Surveys"
              value={searchTerm}
              onChange={handleSearch}
              className="search-input"
            />
          </div>
          <div className="right-buttons">
            <Button>
              <Link to="/addSurvey" className="link">
                Add Survey
              </Link>
            </Button>
            <Button>
              <Link to="/login" className="link">
                Logout
              </Link>
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      <div className="dashboard">
        <h1>Welcome to Your DashBoard, {loggedInUser}</h1>
        <p>This is the DashBoard of your surveys.</p>
        <div className='Scrollable-DashBoard'>
        {filteredForms.map((form, index) => (
  <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <Card className="form-card" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }} onClick={() => handleOpenDialog(form)}>
      <CardContent>
        <Typography variant="h5">{form.title}</Typography>
        <Typography variant="body2">{form.description}</Typography>
        <Typography variant="body2">Questions: {form.questions.length}</Typography>
        <Typography variant='body2'>Options</Typography>
      </CardContent>
    </Card>
    <Link to={`/submitSurvey/${form._id}`} className="link" style={{ marginTop: '10px' }}>
      <Button variant="contained" color="primary">
        Submit Survey
      </Button>
    </Link>
    <IconButton aria-label="delete" onClick={() => handleDeleteForm(form.title)}>
      <DeleteIcon />
    </IconButton>
    <SurveyResponseList formId={form._id} />
  </div>
))}

          {selectedForm && (
            <Dialog open onClose={handleCloseDialog}>
              <DialogTitle>{selectedForm.title}</DialogTitle>
              <DialogContent>
                <Typography variant="body1">{selectedForm.description}</Typography>
                {selectedForm.questions.map((question, index) => (
                  <div key={index}>
                    <Typography variant="body1">{question.text}</Typography>
                    <Typography variant="body2">{question.type}</Typography>
                    <Typography variant="body2">{question.options.join(', ')}</Typography>
                  </div>
                ))}
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
      {selectedFormForSubmission && (
        <SubmitSurveyForm formId={selectedFormForSubmission._id} />
      )}
    </>
  );
};

export default DashBoard;
