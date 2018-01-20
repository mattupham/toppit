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