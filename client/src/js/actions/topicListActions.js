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

export const setSelectedTopic = (selectedTopic) => {
  return {
    type: 'SET_SELECTED_TOPIC',
    payload: selectedTopic
  };
};
export const setDetailedTopic = (detailedTopic) => {
  return {
    type: 'SET_DETAILED_TOPIC',
    payload: detailedTopic
  };
};
export const addComment = (comment) => {
  console.log(comment, ' in actions');
  return {
    type: 'ADD_COMMENT',
    payload: comment
  };
};
export const setDetailedCommentText = (commentText) => {
  console.log(commentText, ' in actions');
  return {
    type: 'SET_COMMENT_TEXT',
    payload: commentText
  };
};
export const setDetailedCommentList = (commentList) => {
  console.log(commentList, ' in actions');
  return {
    type: 'SET_COMMENT_LIST',
    payload: commentList
  };
};
export const setTopicComments = (comments) => {
  console.log(comments, ' in actions');
  return {
    type: 'SET_TOPIC_COMMENTS',
    payload: comments
  };
};
export const addCommentToFront = (topic) => {
  console.log(topic, ' in actions');
  return {
    type: 'ADD_COMMENT_TO_FRONT',
    payload: topic
  };
};

