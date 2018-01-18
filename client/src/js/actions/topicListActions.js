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

export const changeViewedList = (list) => {
  console.log('LIST SORTED', list);
  return {
    type: 'CHANGE_VIEWED_LIST',
    payload: list
  };
};

