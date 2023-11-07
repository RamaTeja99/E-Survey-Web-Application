const initialState = {
  surveys: [], // Array to store survey data
  error: null, // To handle survey-related errors
};

// Define action types
const ADD_SURVEY = 'ADD_SURVEY';
const GET_SURVEYS = 'GET_SURVEYS';
const SURVEY_ERROR = 'SURVEY_ERROR';

// Define action creators

// Action to add a new survey
export const addSurvey = (survey) => ({
  type: ADD_SURVEY,
  payload: survey,
});

// Action to get all surveys
export const getSurveys = (surveys) => ({
  type: GET_SURVEYS,
  payload: surveys,
});

// Action to handle survey-related errors
export const surveyError = (error) => ({
  type: SURVEY_ERROR,
  payload: error,
});

// Define the survey reducer
const surveyReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SURVEY:
      return {
        ...state,
        surveys: [...state.surveys, action.payload],
        error: null,
      };
    case GET_SURVEYS:
      return {
        ...state,
        surveys: action.payload,
        error: null,
      };
    case SURVEY_ERROR:
      return {
        ...state,
        surveys: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default surveyReducer;
