import axios from 'axios';
import {
  GET_POSTS,
  GET_USER_POSTS,
  CLEAR_USER_POSTS,
  ADD_POST,
  UPDATE_POST,
  DELETE_POST,
  POSTS_LOADING } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

// GET POSTS
export const getPosts = () => dispatch => {
  dispatch(setPostsLoading());
  axios
    .get('/api/posts')
    .then(res =>
      dispatch({
        type: GET_POSTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// GET USER POSTS
export const getUserPosts = post => (dispatch, getState) => {
  dispatch(setPostsLoading());
  axios
    .post('/api/posts/user', post, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: GET_USER_POSTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// GET FOLLOWINGS POSTS
export const getFollowingsPosts = followings => (dispatch, getState) => {
  dispatch(setPostsLoading());
    axios
      .post('/api/posts/followings', followings, tokenConfig(getState))
      .then(res =>
        dispatch({
          type: GET_POSTS,
          payload: res.data
        })
      )
      .catch(err =>
        dispatch(returnErrors(err.response.data, err.response.status))
      );
};

// GET LANGUAGE POSTS
export const getLanguagePosts = language => (dispatch, getState) => {
  dispatch(setPostsLoading());
  axios
    .get(`/api/posts/${language}`)
    .then(res =>
      dispatch({
        type: GET_POSTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// CLEAR USER POSTS
export const clearUserPosts = () => {
  return {
    type: CLEAR_USER_POSTS
  };
};

// ADD POST
export const addPost = post => (dispatch, getState) => {
  axios
    .post('/api/posts', post, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: ADD_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// UPDATE POST
export const updatePost = (id, post) => (dispatch, getState) => {
  axios
    .post(`/api/posts/${id}`, post, tokenConfig(getState))
    .then(res => 
      dispatch({
        type: UPDATE_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// DELETE POST
export const deletePost = id => (dispatch, getState) => {
  axios
    .delete(`/api/posts/${id}`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: DELETE_POST,
        payload: id
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// POSTS LOADING
export const setPostsLoading = () => {
  return {
    type: POSTS_LOADING
  };
};
