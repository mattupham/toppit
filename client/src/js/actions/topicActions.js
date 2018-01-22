export const setTopicUsername = (username) => {
  // console.log(username, ' in actions');
  return {
    type: 'SET_TOPIC_USERNAME',
    payload: username
  };
};
export const displayNewTopic = (display) => {
  // console.log(display, ' in actions');
  return {
    type: 'DISPLAY_NEW_TOPIC',
    payload: display
  };
};
export const setHeadline = (headline) => {
  // console.log(headline, ' in actions');
  return {
    type: 'SET_HEADLINE',
    payload: headline
  };
};
export const setDescription = (description) => {
  // console.log(description, ' in actions');
  return {
    type: 'SET_DESCRIPTION',
    payload: description
  };
};
export const setEmotion = (emotion) => {
  // console.log(emotion, ' in actions');
  return {
    type: 'SET_EMOTION',
    payload: emotion
  };
};
export const setSubtoppitToPostTo = (subtoppit) => {
  return {
    type: 'SET_SUBTOPPIT_TO_POST_TO',
    payload: subtoppit
  };
};
export const setAnon = (anon) => {
  // console.log(anon, ' in actions');
  return {
    type: 'SET_ANON',
    payload: anon
  };
};
export const addComment = (comment) => {
  // console.log(comment, ' in actions');
  return {
    type: 'ADD_COMMENT',
    payload: comment
  };
};
export const setCommentText = (commentText) => {
  // console.log(commentText, ' in actions');
  return {
    type: 'SET_COMMENT_TEXT',
    payload: commentText
  };
};
export const setUpvoteStateColor = (upvoteStateColor) => {
  // console.log(upvoteStateColor, ' in actions');
  return {
    type: 'SET_UPVOTE_COLOR',
    payload: upvoteStateColor
  };
};
