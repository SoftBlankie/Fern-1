import {
  GET_PROFILE,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  FOLLOW_PROFILE,
  PROFILE_LOADING
} from '../actions/types';

const initialState = {
  profile: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null
      };
    case UPDATE_PROFILE:
    case FOLLOW_PROFILE:
      return {
        ...state,
        profile: action.payload
      };
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
