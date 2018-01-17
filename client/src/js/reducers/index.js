import { combineReducers } from 'redux';

import user from './userReducer.js';
import topic from './topicReducer.js';

export default combineReducers({
  user,
  topic
});