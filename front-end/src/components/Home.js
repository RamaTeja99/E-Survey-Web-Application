import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import './Home.css'; // Import the CSS file

const Home = () => {
  return (
    <div className="Body">
    <div>
      <AppBar position="static">
        <Toolbar className="navbar">
          <Button>
            <Link to="/login" className="link">
              Login
            </Link>
          </Button>
          <Button>
            <Link to="/register" className="link">
              Register
            </Link>
          </Button>
        </Toolbar>
      </AppBar>
      <h1 className="title">Esurvey Application</h1>
      <div className="content">
        <div className="column">
          <h2>Welcome to the Survey Portal</h2>
          <p>Explore the world of surveys and data collection.</p>
        </div>

        <div className="column">
          <h3>Survey Usages</h3>
          <p>Surveys are a powerful tool for gathering information and insights from people. They are commonly used for:</p>
          <ul>
            <li>Market research</li>
            <li>Customer feedback</li>
            <li>Employee satisfaction</li>
            <li>Academic research</li>
            <li>Public opinion polls</li>
          </ul>
        </div>

        <div className="column">
          <h3>Facts of Surveys</h3>
          <p>Here are some interesting facts about surveys:</p>
          <ul>
            <li>Surveys can be conducted online, via phone, in person, or through mailed questionnaires.</li>
            <li>Effective survey design is essential for obtaining reliable and valuable data.</li>
            <li>Surveys can be used to measure attitudes, behaviors, and demographics.</li>
            <li>Data analysis and interpretation are key steps in deriving meaningful insights from surveys.</li>
            <li>Surveys are a cost-effective method for data collection and research.</li>
          </ul>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Home;
