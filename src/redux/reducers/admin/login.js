import { LOGIN_SUCCESS, LOGIN_FAILED } from '../../actionTypes';

const initialState = {
  status: '',
  message: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        status: 'success',
        message: action.message,
        token: action.token
      };
    case LOGIN_FAILED:
      return { ...state, status: 'error', error: action.error };
    default:
      return state;
  }
}
