import axios, { config } from '..';
import {
  DELETE_CONTACTS_SUCCESS,
  DELETE_CONTACTS_FAILED,
} from '../../actionTypes';

export default (id) => async (dispatch) => {
  try {
    const response = await axios.delete(`contacts/delete/${id}`, config);
    const {
      data: { message },
    } = response;

    dispatch({
      type: DELETE_CONTACTS_SUCCESS,
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
    dispatch({ type: DELETE_CONTACTS_FAILED, error });
    console.log(err);
  }
};
