export const setCommentId = (commentId) => {
  console.log(commentId, ' in actions');
  return {
    type: 'SET_COMMENT_ID',
    payload: commentId
  };
};
export const setReplyCommentText = (commentText) => {
  console.log(commentText, ' in actions!');
  return {
    type: 'SET_REPLY_TEXT',
    payload: commentText
  };
};
export const setShowReply = (showReply) => {
  //change filter
  console.log(showReply, ' in actions!');
  return {
    type: 'SET_SHOW_REPLY',
    payload: showReply
  };
};
export const setNewNested = (nested) => {
  console.log(nested, ' in actions!');
  return {
    type: 'SET_NESTED_COMMENTS',
    payload: nested
  };
};
export const setNestedCommentsCopy = (copy) => {
  console.log(copy, ' in actions');
  return {
    type: 'SET_NESTED_COMMENTS_COPY',
    payload: copy
  };
};
export const addNestedToFront = (nested) => {
  console.log(nested, ' in actions');
  return {
    type: 'ADD_NESTED_TO_FRONT',
    payload: nested
  };
};