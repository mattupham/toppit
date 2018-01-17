export const ADD_TOPIC_TO_LIST = 'ADD_TOPIC_TO_LIST';

export const addTopicToList = (value) => {
  return {
    type: 'ADD_TOPIC_TO_LIST',
    payload: value
  };
};

