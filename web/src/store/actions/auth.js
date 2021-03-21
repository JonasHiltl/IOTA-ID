import axios from 'axios';
import {
    AUTHENTICATED_FAILED,
    AUTHENTICATED_SUCCESS,
} from './types';
axios.defaults.withCredentials = true;

export const verify = docHash => async dispatch => {
    if (typeof window == 'undefined') {
        dispatch({
            type: AUTHENTICATED_FAILED
        });
    }

    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({id: docHash})

    try {
        const res = await axios.post('http://localhost:3001/verify', body, config)

        if (res.data.success === true) {
            dispatch({
                type: AUTHENTICATED_SUCCESS,
                payload: res.data
            });
        } else {
            dispatch({
                type: AUTHENTICATED_FAILED,
                payload: res.data
            });
        }
    } catch (err) {
        dispatch({
            type: AUTHENTICATED_FAILED,
            payload: err
        });
    }
};