import {
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGOUT_USER,
} from '../actions/authActions';

const initialState = {
  user: null,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER_SUCCESS:
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: null,
      };
    case REGISTER_USER_FAILURE:
    case LOGIN_USER_FAILURE:
      return {
        ...state,
        user: null,
        error: action.payload,
      };
    case LOGOUT_USER:
      return {
        ...state,
        user: null,
        error: null,
      };
    default:
      return state;
  }
};

export default authReducer;
