import axios from '..';
import { LOGIN_SUCCESS, LOGIN_FAILED } from '../../actionTypes';

export default (body) => async (dispatch) => {
  try {
    const response = await axios.post('/admin/login', body);
    const {
      data: {
        message,
        data: { token },
      },
    } = response;
    dispatch({
      type: LOGIN_SUCCESS,
      message,
      token,
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
    dispatch({ type: LOGIN_FAILED, error });
    console.log(err);
  }
};
