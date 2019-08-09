import axios from 'axios';
import {
  GET_PROFILE,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  PROFILE_LOADING
} from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const getProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('/api/profiles')
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const clearProfile = () => {
  return {
    type: CLEAR_PROFILE
  };
};

export const updateProfile = (id, profile) => (dispatch, getState) => {
  axios
    .post(`/api/profiles/${id}`, profile, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};
