export default function reducer(state = {
  comment: {
    commentId: 0,
    commentText: '',
    showReply: false
  }
}, action) {
  switch (action.type) {
    case 'SET_COMMENT_ID': {
      return {
        ...state,
        commentId: { ...state.comment, commentId: action.payload }
      }
    }
    case 'SET_REPLY_TEXT': {
      return {
        ...state,
        commentText: action.payload
      }
    }
    case 'SET_SHOW_REPLY': {
      return {
        ...state,
        showReply: { ...state.comment, showReply: action.payload }
      }
    }
    default: {
      return state
    }
  }
}