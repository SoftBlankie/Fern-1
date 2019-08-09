import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import postReducer from './postReducer';
import commentReducer from './commentReducer';
import editReducer from './editReducer';
import profileReducer from './profileReducer';

export default combineReducers({
  auth: authReducer,
  error: errorReducer,
  post: postReducer,
  comment: commentReducer,
  edit: editReducer,
  profile: profileReducer,
});
