import { combineReducers } from 'redux';

import user from './userReducer.js';
import search from './searchReducer.js'

export default combineReducers({
  user,
  search
})