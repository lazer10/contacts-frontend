import { combineReducers } from 'redux';

import contacts from './contacts';
import admin from './admin';

export default combineReducers({
  ...contacts,
  ...admin,
});
