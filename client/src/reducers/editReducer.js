import {
  GET_EDITS,
  CLEAR_EDITS,
  ADD_EDIT,
  UPDATE_EDIT,
  DELETE_EDIT,
  EDITS_LOADING
} from '../actions/types';

const initialState = {
  edits: [],
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_EDITS:
      return {
        ...state,
        edits: action.payload,
        loading: false
      };
    case CLEAR_EDITS:
      return {
        ...state,
        edits: []
      };
    case ADD_EDIT:
      return {
        ...state,
        edits: [action.payload, state.edits]
      };
    case UPDATE_EDIT:
      return {
        ...state,
        edits: [action.payload, state.posts]
      };
    case DELETE_EDIT:
      return {
        ...state,
        edits: state.edits.filter(edit => edit.id !== action.payload)
      };
    case EDITS_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
