export const setReplyCommentText = (commentText) => {
  //change filter
  console.log(commentText, ' in actions!');
  return {
    type: 'SET_REPLY_TEXT',
    payload: commentText
  };
};