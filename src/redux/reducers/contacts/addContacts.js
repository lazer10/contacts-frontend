import { 
    ADD_CONTACTS_SUCCESS,
    ADD_CONTACTS_FAILED 
} from '../../actionTypes';

const initialState = {
    status: '',
    message: ''
};

export default function(state = initialState, action) {
    switch (action.type) {
        case ADD_CONTACTS_SUCCESS:
            return {
                ...state,
                status: 'success',
                message: action.message,
            };
            case ADD_CONTACTS_FAILED:
                return { ...state, status: 'error', error: action.error };
            default:
                return state;
    }
}