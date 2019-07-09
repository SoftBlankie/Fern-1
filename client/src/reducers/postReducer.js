import {
  GET_POSTS,
  GET_USER_POSTS,
  CLEAR_USER_POSTS,
  ADD_POST,
  DELETE_POST,
  POSTS_LOADING
} from '../actions/types';

const initialState = {
  posts: [],
  userPosts: [],
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      };
    case GET_USER_POSTS:
      return {
        ...state,
        userPosts: action.payload,
        loading: false
      };
    case CLEAR_USER_POSTS:
      return {
        ...state,
        userPosts: []
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.payload)
      };
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      };
    case POSTS_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
