import axios from 'axios';
import {
  GET_COMMENTS,
  CLEAR_COMMENTS,
  ADD_COMMENT,
  UPDATE_COMMENT,
  LIKE_COMMENT,
  DELETE_COMMENT,
  REPORT_COMMENT,
  COMMENTS_LOADING
} from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

// GET COMMENTS
export const getComments = id => dispatch => {
  dispatch(setCommentsLoading());
  axios
    .get(`/api/posts/${id}/comments`)
    .then(res =>
      dispatch({
        type: GET_COMMENTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// CLEAR COMMENTS
export const clearComments = () => {
  return {
    type: CLEAR_COMMENTS
  };
};

// ADD COMMENT
export const addComment = (id, comment) => (dispatch, getState) => {
  axios
    .post(`/api/posts/${id}/comments`, comment, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: ADD_COMMENT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// UPDATE COMMENT
export const updateComment = (post_id, comment_id, comment) => (dispatch, getState) => {
  axios
    .post(`/api/posts/${post_id}/comments/${comment_id}`, comment, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: UPDATE_COMMENT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// LIKE COMMENT
export const likeComment = (post_id, comment_id, comment) => (dispatch, getState) => {
  axios
    .post(`/api/posts/${post_id}/comments/${comment_id}`, comment, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: LIKE_COMMENT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// DELETE COMMENT
export const deleteComment = (post_id, comment_id) => (dispatch, getState) => {
  axios
    .delete(`/api/posts/${post_id}/comments/${comment_id}`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: DELETE_COMMENT,
        payload: comment_id
      })
    )
    .catch(err => 
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// REPORT COMMENT
export const reportComment = (post_id, comment_id, comment) => (dispatch, getState) => {
  axios
    .post(`/api/posts/${post_id}/comments/${comment_id}`, comment, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: REPORT_COMMENT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// COMMENTS LOADING
export const setCommentsLoading = () => {
  return {
    type: COMMENTS_LOADING
  };
};
