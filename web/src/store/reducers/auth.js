import produce from 'immer';
import {
    AUTHENTICATED_FAILED,
    AUTHENTICATED_SUCCESS,
} from '../actions/types';

const initialState = {
    isAuthenticated: false
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
        default:
            return state
    }
}