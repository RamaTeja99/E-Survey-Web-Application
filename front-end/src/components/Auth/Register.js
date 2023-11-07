import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './Register.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const history = useHistory();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/form/addUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, phoneNumber }),
      });

      if (response.status === 200) {
        alert("Successfully created! Please log in to proceed")
        history.push('/login');
      } else {
        const data = await response.json();
        setError(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError('Something went wrong');
    }
  };

  return (
    <div className="register-container">
      <Button
        component={Link}
        to="/"
        startIcon={<ArrowBackIcon />}
        variant="outlined"
        color="primary"
        style={{ position: 'absolute', left: '10px', top: '10px' }}
      >
        Back
      </Button>
      <div className="register-form">
        <Typography variant="h4" component="h2">
          Register
        </Typography>
        <form className="form" onSubmit={handleRegister}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Phone Number:</label>
            <input
              type="phone Number"
              value={phoneNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label>Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="register-button">
            Register
          </button>
        </form>
        {error && <div className="error">{error}</div>}
        <div className="link-container">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
