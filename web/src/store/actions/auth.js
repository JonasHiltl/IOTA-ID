import axios from 'axios';
import Localbase from "localbase";
import {
  AUTHENTICATED_FAILED,
  AUTHENTICATED_SUCCESS,
  USERLOADED_SUCCESS,
  USERLOADED_FAILED
} from './types';
axios.defaults.withCredentials = true;

const db = new Localbase("db")

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

export const loadPersonalInformation = () => async dispatch => {
  try {
    db.collection('identity').doc("personalInformation").get()
      .then(document => {
        dispatch({
          type: USERLOADED_SUCCESS,
          payload: document
        });
      })
      .catch(
        dispatch({
          type: USERLOADED_FAILED,
          payload: "Couldn't load your personal information. Did you clear your browser cache?"
        })
      )
  } catch (error) {
    dispatch({
      type: USERLOADED_FAILED,
      payload: "Couldn't load your personal information. Did you clear your browser cache?"
    })
  }
};
