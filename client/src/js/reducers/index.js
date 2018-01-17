import { combineReducers } from 'redux';

import user from './userReducer.js';
import topic from './topicReducer.js';
<<<<<<< HEAD
import search from './searchReducer.js';
import topicList from './topicListReducer.js';
=======

import search from './searchReducer.js'
import topicList from './topicListReducer.js'
import utilsBar from './utilsBarReducer.js';
>>>>>>> fix commit for rebase

export default combineReducers({
  user,
  topic,
  search,
  topicList,
  utilsBar
});
