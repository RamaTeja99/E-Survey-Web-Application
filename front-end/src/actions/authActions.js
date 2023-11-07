import axios from 'axios';

export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';
export const LOGOUT_USER = 'LOGOUT_USER';

export const registerUser = (userData, history) => async (dispatch) => {
  try {
    console.log("userData1",userData)
    // Simulated API call
    // Replace this with your actual API endpoint
    const response = await axios.post('http://localhost:8080/form/addUser', userData);

    dispatch({
      type: REGISTER_USER_SUCCESS,
      payload: response.data,
    });

    history.push('/login'); // Redirect after successful registration
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAILURE,
      payload: error.response.data,
    });
  }
};

export const loginUser = (userData, history) => async (dispatch) => {
  try {
    const headers = { 'Content-Type': 'application/json' };
    const params = { email: userData.email, password: userData.password };

    const response = await axios.get('http://localhost:8080/form/getUserForLogin', {
      params, headers
    });

    if (response.status === 200) {
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: response.data,
      });
      alert('Login successful');
    } else {
      dispatch({
        type: LOGIN_USER_FAILURE,
        payload: response.data.message,
      });
    }
    history.push('/dashboard');
  } catch (error) {
    dispatch({
      type: LOGIN_USER_FAILURE,
      payload: error.response.data,
    });
    alert('No user found. Please register.');
    history.push('/register');
  }
};

export const logoutUser = () => (dispatch) => {
  dispatch({ type: LOGOUT_USER });
};
