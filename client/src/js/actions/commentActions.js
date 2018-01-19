export const setCommentId = (commentId) => {
  console.log(commentId, ' in actions');
  return {
    type: 'SET_COMMENT_ID',
    payload: commentId
  };
};
export const setReplyCommentText = (commentText) => {
  //change filter
  console.log(commentText, ' in actions!');
  return {
    type: 'SET_REPLY_TEXT',
    payload: commentText
  };
};