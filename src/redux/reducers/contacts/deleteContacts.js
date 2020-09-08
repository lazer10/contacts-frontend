import {
  DELETE_CONTACTS_SUCCESS,
  DELETE_CONTACTS_FAILED,
  CLEAR_DELETE_CONTACTS,
} from '../../actionTypes';

const initialState = {
  status: '',
  message: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case DELETE_CONTACTS_SUCCESS:
      return {
        ...state,
        status: 'success',
        message: action.message,
      };
    case DELETE_CONTACTS_FAILED:
      return { ...state, status: 'error', error: action.error };
    case CLEAR_DELETE_CONTACTS:
      return {
        ...initialState,
        status: 'clear',
      };
    default:
      return state;
  }
}
