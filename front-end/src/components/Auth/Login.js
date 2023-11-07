import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import { Button, TextField, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Import the ArrowBack icon
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userData = { email, password };
      dispatch(loginUser(userData, history));
    } catch (error) {
      setError('Something went wrong');
    }
  };

  return (
    <div className="login-container">
      <Button
        component={Link}
        to="/"
        startIcon={<ArrowBackIcon />} // Use the ArrowBack icon
        variant="outlined"
        color="primary"
        style={{ position: 'absolute', left: '10px', top: '10px' }}
      >
        Back
      </Button>
      <form className="login-form" onSubmit={handleLogin}>
        <Typography variant="h2">Login</Typography>
        <TextField
          label="Email"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
        {error && <div className="error">{error}</div>}
        <div className="register-link">
          Don't have an account? <Link to="/register">Register</Link>
        </div>
        <div className="phone-auth-link">
          Or login with your phone number <Link to="/phoneAuth">Phone Authentication</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
