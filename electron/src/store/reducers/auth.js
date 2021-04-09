import produce from 'immer';
import {
  AUTHENTICATED_FAILED,
  AUTHENTICATED_SUCCESS,
  USERLOADED_SUCCESS,
  USERLOADED_FAILED,
  PATIENT_QUESTIONNAIRE_LOADED_SUCCESS,
  PATIENT_QUESTIONNAIRE_LOADED_FAILED
} from '../actions/types';

const initialState = {
  isAuthenticated: undefined,
  personalInformation: {},
  patientQuestionnaire: []
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
    case PATIENT_QUESTIONNAIRE_LOADED_SUCCESS:
      return produce(state, draft => {
        draft.patientQuestionnaire = payload.transactions;
      })
    case PATIENT_QUESTIONNAIRE_LOADED_FAILED:
      return produce(state, draft => {
      })
    default:
        return state
  }
}