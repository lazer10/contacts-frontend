import axios, { config } from '..';
import {
  FETCH_CONTACTS_SUCCESS,
  FETCH_CONTACTS_FAILED,
  CLEAR_UPDATE_CONTACTS,
  CLEAR_DELETE_CONTACTS,
} from '../../actionTypes';

export default () => async (dispatch) => {
  try {
    dispatch({
      type: CLEAR_UPDATE_CONTACTS,
    });
    dispatch({
      type: CLEAR_DELETE_CONTACTS,
    });
    const response = await axios.get('/contacts', config);
    const {
      data: { message, data },
    } = response;

    dispatch({
      type: FETCH_CONTACTS_SUCCESS,
      message,
      results: data,
    });
  } catch (err) {
    let error = {};
    if (err.response) {
      const {
        data: { status, message },
      } = err.response;
      error = { status, message };
    } else {
      error = {
        status: 500,
        message: err.message,
      };
    }
    dispatch({ type: FETCH_CONTACTS_FAILED, error });
    console.log(err);
  }
};
