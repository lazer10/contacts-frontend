import { 
    UPDATE_CONTACTS_SUCCESS,
    UPDATE_CONTACTS_FAILED,
    CLEAR_UPDATE_CONTACTS 
} from '../../actionTypes';

const initialState = {
    status: '',
    message: ''
};

export default function(state = initialState, action) {
    switch (action.type) {
        case UPDATE_CONTACTS_SUCCESS:
            return {
                ...state,
                status: 'success',
                message: action.message,
            };
            case UPDATE_CONTACTS_FAILED:
                return { ...state, status: 'error', error: action.error };
                case CLEAR_UPDATE_CONTACTS:
                    return {
                        ...initialState,
                        status: 'clear',
                    }
            default:
                return state;
    }
}