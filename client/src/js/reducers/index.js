import { combineReducers } from 'redux';

import user from './userReducer.js';
import topic from './topicReducer.js';
import search from './searchReducer.js';
import topicList from './topicListReducer.js';

export default combineReducers({
  user,
  topic,
  search,
  topicList,
  utilsBar
});
