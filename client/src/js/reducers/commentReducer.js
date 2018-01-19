export default function reducer(state = {
  comment: {
    commentId: 0,
    commentText: ''
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
        commentText: { ...state.comment, commentText: action.payload }
      }
    }
    default: {
      return state
    }
  }
}