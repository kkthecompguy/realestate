import * as actionTypes from './types';

export const createMessage = msg => {
  return {
    type: actionTypes.CREATE_MESSAGE,
    payload: msg
  }
} 
