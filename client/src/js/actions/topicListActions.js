export const ADD_TOPIC_TO_LIST = 'ADD_TOPIC_TO_LIST';

export const addTopicToList = (topic) => {
  return {
    type: 'ADD_TOPIC_TO_LIST',
    payload: topic
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

export const setSelectedTopic = (selectedTopic) => {
  return {
    type: 'SET_SELECTED_TOPIC',
    payload: selectedTopic
  };
};

export const setDetailedTopic = (detailedTopic) => {
  console.log('Setting detailed topic', detailedTopic, 'in actions!');
  return {
    type: 'SET_DETAILED_TOPIC',
    payload: detailedTopic
  };
};
