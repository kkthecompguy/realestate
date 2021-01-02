import * as actionTypes from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: false
}

export default function (state=initialState, action) {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.access)
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        token: action.payload.access
      }
    case actionTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        loading: true
      }
    case actionTypes.SIGNUP_FAIL:
    case actionTypes.LOGIN_FAIL:
    case actionTypes.LOGOUT:
      localStorage.removeItem('token')
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false
      }
    default:
      return state;
  }
}
