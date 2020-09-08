import axios, { config } from '..';
import { 
    ADD_CONTACTS_SUCCESS, ADD_CONTACTS_FAILED
 } from '../../actionTypes';

 export default (body) => async (dispatch) => {
     try {
         const response = await axios.post('/contacts/new', body, config);
         const { data: { message } } = response;

         dispatch({
             type: ADD_CONTACTS_SUCCESS,
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
         dispatch({ type: ADD_CONTACTS_FAILED, error });
         console.log(err);
     }
 };