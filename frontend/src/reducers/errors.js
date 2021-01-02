import * as actionTypes from '../actions/types';

const initialState = {
  msg: {},
  status: ""
}

export default function(state=initialState, action)  {
  switch (action.type) {
    case actionTypes.GET_ERRORS:
      return {
        ...state, 
        msg: action.payload.msg,
        status: action.payload.status
      }
  
    default:
      return state;
  }
}