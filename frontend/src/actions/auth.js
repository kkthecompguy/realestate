import axios from 'axios';
import * as actionTypes from './types';
import { createMessage } from './messages';
import { returnErrors } from './errors';

export const login = (email, password) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  }

  const data = JSON.stringify({email, password});

  try {
    const res = await axios.post('http://127.0.0.1:8000/api/token/', data, config)

    dispatch({
      type: actionTypes.LOGIN_SUCCESS,
      payload: res.data
    });
    dispatch(createMessage({loginSuccess: "You are successfully logged in"}));
  } catch (err) {
    dispatch({
      type: actionTypes.LOGIN_FAIL
    });
    console.log(err.reponse)
    // dispatch(returnErrors(err.response.data, err.response.status));
    dispatch(createMessage({loginFail: "Your credentials are not valid"}));
  }
}

export const signup = (name, email, password, password2) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  }

  const data = JSON.stringify({name, email, password, password2});

  try {
    await axios.post('http://127.0.0.1:8000/api/accounts/signup/', data, config);

    dispatch({
      type: actionTypes.SIGNUP_SUCCESS
    });
    dispatch(login(email, password))
  } catch (err) {
    dispatch({
      type: actionTypes.SIGNUP_FAIL
    });
    dispatch(returnErrors(err.response.data, err.response.status));
  }
}

export const logout = () => dispatch => {
  dispatch({
    type: actionTypes.LOGOUT
  });
  dispatch(createMessage({logoutSuccess: "You are logged out"}))
}