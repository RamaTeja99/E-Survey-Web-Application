import axios from 'axios';

// Action Types
export const CREATE_SURVEY_SUCCESS = 'CREATE_SURVEY_SUCCESS';
export const CREATE_SURVEY_FAILURE = 'CREATE_SURVEY_FAILURE';
export const FETCH_SURVEYS_SUCCESS = 'FETCH_SURVEYS_SUCCESS';
export const FETCH_SURVEYS_FAILURE = 'FETCH_SURVEYS_FAILURE';
export const DELETE_SURVEY_SUCCESS = 'DELETE_SURVEY_SUCCESS';
export const DELETE_SURVEY_FAILURE = 'DELETE_SURVEY_FAILURE';

// Create a new survey
export const createSurvey = (surveyData) => async (dispatch) => {
  try {
    const response = await axios.post('/form/addForm', surveyData);
    dispatch({
      type: CREATE_SURVEY_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_SURVEY_FAILURE,
      payload: error.response.data,
    });
  }
};

// Fetch surveys
export const fetchSurveys = () => async (dispatch) => {
  try {
    const response = await axios.get('/form/getForm');
    dispatch({
      type: FETCH_SURVEYS_SUCCESS,
      payload: response.data.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_SURVEYS_FAILURE,
      payload: error.response.data,
    });
  }
};

// Delete a survey
export const deleteSurvey = (surveyId) => async (dispatch) => {
  try {
    await axios.delete(`/form/deleteForm/${surveyId}`);
    dispatch({
      type: DELETE_SURVEY_SUCCESS,
      payload: surveyId,
    });
  } catch (error) {
    dispatch({
      type: DELETE_SURVEY_FAILURE,
      payload: error.response.data,
    });
  }
};
