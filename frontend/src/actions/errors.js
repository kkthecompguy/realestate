import *as actionTypes from './types';

export const returnErrors = (msg, status) => {
  return {
    type: actionTypes.GET_ERRORS,
    payload: {msg, status}
  }
}