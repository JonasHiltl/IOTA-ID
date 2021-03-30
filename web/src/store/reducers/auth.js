import produce from 'immer';
import {
  AUTHENTICATED_FAILED,
  AUTHENTICATED_SUCCESS,
  USERLOADED_SUCCESS,
  USERLOADED_FAILED
} from '../actions/types';

const initialState = {
  isAuthenticated: undefined,
  personalInformation: {}
};

export default function(state=initialState, action) {
  const { type, payload } = action;
    
  switch(type) {
    case AUTHENTICATED_SUCCESS:
      return produce(state, draft => {
        draft.isAuthenticated = true;
      })
    case AUTHENTICATED_FAILED:
      return produce(state, draft => {
        draft.isAuthenticated = false;
      })
    case USERLOADED_SUCCESS:
      return produce(state, draft => {
        draft.personalInformation = payload.credential.credentialSubject;
      })
    case USERLOADED_FAILED:
      return produce(state, draft => {
      })
    default:
        return state
  }
}