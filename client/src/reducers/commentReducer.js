import {
  GET_COMMENTS,
  CLEAR_COMMENTS,
  ADD_COMMENT,
  UPDATE_COMMENT,
  LIKE_COMMENT,
  DELETE_COMMENT,
  COMMENTS_LOADING
} from '../actions/types';

const initialState = {
  comments: [],
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_COMMENTS:
      return {
        ...state,
        comments: action.payload,
        loading: false
      };
    case CLEAR_COMMENTS:
      return {
        ...state,
        comments: []
      };
    case ADD_COMMENT:
      return {
        ...state,
        comments: [action.payload, ...state.comments]
      };
    case UPDATE_COMMENT:
      return {
        ...state,
        comments: [action.payload,
          ...state.comments.filter(comment => comment.id !== action.payload.id)]
      };
    case LIKE_COMMENT:
      return {
        ...state,
        comments: [...state.comments]
      };
    case DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(comment => comment.id !== action.payload)
      };
    case COMMENTS_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
