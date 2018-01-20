export default function reducer(state = {
  comment: {
    commentId: 0,
    commentText: '',
    showReply: false,
    nestedComments: [],
    nestedCommentsCopy: []
  }
}, action) {
  switch (action.type) {
    case 'SET_COMMENT_ID': {
      return {
        ...state,
        commentId: action.payload
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
        showReply: action.payload
      }
    }
    case 'SET_NESTED_COMMENTS_COPY': {
      return {
        ...state,
        nestedCommentsCopy: action.payload
      }
    }
    // case 'SET_NESTED_COMMENTS': {
    //   return {
    //     ...state,
    //     // nestedComments: state.comment.nestedComments.push(action.payload)
    //   }
    // }
    default: {
      return state
    }
  }
}