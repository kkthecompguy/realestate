import * as actionTypes from '../actions/types';

const initialState = {}

export default function(state=initialState, action) {
  switch (action.type) {
    case actionTypes.CREATE_MESSAGE:
      return (state = action.payload)
    default:
      return state;
  }
}