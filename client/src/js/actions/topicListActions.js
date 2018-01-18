export const ADD_TOPIC_TO_LIST = 'ADD_TOPIC_TO_LIST';

export const addTopicToList = (value) => {
  return {
    type: 'ADD_TOPIC_TO_LIST',
    payload: value
  };
};

export const addTopicToListFront = (value) => {
  return {
    type: 'ADD_TOPIC_TO_LIST_FRONT',
    payload: value
  };
};

export const changeSearchedList = (list) => {
  return {
    type: 'CHANGE_SEARCHED_LIST',
    payload: list
  };
};

export const changeFilteredList = (list) => {
  return {
    type: 'CHANGE_FILTERED_LIST',
    payload: list
  };
};

