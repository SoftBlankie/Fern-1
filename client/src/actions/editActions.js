import axios from 'axios';
import {
  GET_EDITS,
  CLEAR_EDITS,
  ADD_EDIT,
  UPDATE_EDIT,
  AGREE_EDIT,
  DELETE_EDIT,
  REPORT_EDIT,
  EDITS_LOADING
} from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

// GET EDITS
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

// CLEAR EDITS
export const clearEdits = () => {
  return {
    type: CLEAR_EDITS
  };
};

// ADD EDIT
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

// UPDATE EDIT
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

// AGREE EDIT
export const agreeEdit = (post_id, edit_id, edit) => (dispatch, getState) => {
  axios
    .post(`/api/posts/${post_id}/edits/${edit_id}`, edit, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: AGREE_EDIT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// DELETE EDIT
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

// REPORT EDIT
export const reportEdit = (post_id, edit_id, edit) => (dispatch, getState) => {
  axios
    .post(`/api/posts/${post_id}/edits/${edit_id}`, edit, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: REPORT_EDIT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// EDITS LOADING
export const setEditsLoading = () => {
  return {
    type: EDITS_LOADING
  };
};
