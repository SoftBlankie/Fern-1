import axios from 'axios';
import {
  SEND_MAIL
} from './types';
import { returnErrors } from './errorActions';

// SEND MAIL
export const sendMail = mail => dispatch => {
  axios
    .post('/api/mailer', mail)
    .then(() =>
      dispatch({
        type: SEND_MAIL
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
