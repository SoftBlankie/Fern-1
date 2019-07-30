import axios from 'axios';
import {
  GET_EDITS,
  CLEAR_EDITS,
  ADD_EDIT,
  UPDATE_EDIT,
  DELETE_EDIT,
  EDITS_LOADING
} from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const getEdits = id => dispatch => {
  dispatch(setEditsLoading());
  axios
    .get(`/api/posts/${id}/edits`)
    .then(res =>
      dispatch({
        type: GET_EDITS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const clearEdits = () => {
  return {
    type: CLEAR_EDITS
  };
};

export const addEdit = (id, edit) => (dispatch, getState) => {
  axios
    .post(`/api/posts/${id}/edits`, edit, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: ADD_EDIT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const updateEdit = (post_id, edit_id, edit) => (dispatch, getState) => {
  axios
    .post(`/api/posts/${post_id}/edits/${edit_id}`, edit, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: UPDATE_EDIT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteEdit = (post_id, edit_id) => (dispatch, getState) => {
  axios
    .delete(`/api/posts/${post_id}/edits/${edit_id}`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: DELETE_EDIT,
        payload: edit_id
      })
    )
    .catch(err => 
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setEditsLoading = () => {
  return {
    type: EDITS_LOADING
  };
};
