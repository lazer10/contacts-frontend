import axios, { config } from '..';
import {
  UPDATE_CONTACTS_SUCCESS,
  UPDATE_CONTACTS_FAILED,
} from '../../actionTypes';

export default (body, id) => async (dispatch) => {
  try {
    const response = await axios.put(`/contacts/${id}`, body, config);
    const {
      data: { message },
    } = response;

    dispatch({
      type: UPDATE_CONTACTS_SUCCESS,
      message,
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
    dispatch({ type: UPDATE_CONTACTS_FAILED, error });
    console.log(err);
  }
};
