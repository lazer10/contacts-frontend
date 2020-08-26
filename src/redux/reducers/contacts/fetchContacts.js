import { 
    FETCH_CONTACTS_SUCCESS,
    FETCH_CONTACTS_FAILED 
} from '../../actionTypes';

const initialState = {
    status: '',
    message: '',
    results:[],
};

export default function(state = initialState, action) {
    switch (action.type) {
        case FETCH_CONTACTS_SUCCESS:
            return {
                ...state,
                status: 'success',
                message: action.message,
                results: action.results
            };
            case FETCH_CONTACTS_FAILED:
                return { ...state, status: 'error', error: action.error };
            default:
                return state;
    }
}