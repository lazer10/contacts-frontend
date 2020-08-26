import axios, { config } from '..';
import { 
    FETCH_CONTACTS_SUCCESS, FETCH_CONTACTS_FAILED
 } from '../../actionTypes';

 export default () => async (dispatch) => {
     try {
         const response = await axios.get('/contacts', config);
         const { data } = response;

         dispatch({
             type: FETCH_CONTACTS_SUCCESS,
             message: 'Successfullt fetched contacts',
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
         dispatch({ tyoe: FETCH_CONTACTS_FAILED, error });
         console.log(err);
     }
 };