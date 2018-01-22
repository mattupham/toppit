export default function reducer(state = {
  commentId: 0,
  commentText: '',
  showReply: false,
  nestedComments: [],
  nestedCommentsCopy: [],
  containsObj: false
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
    case 'SET_NEW_NESTED': {
      return {
        ...state,
        nestedCommentsCopy: [action.payload].concat(state.nestedComments)
      }
    }
    case 'ADD_NESTED_TO_FRONT': {
      // console.log('adding topic to list front');
      return {
        ...state,
        nestedCommentsCopy: state.nestedCommentsCopy.concat(action.payload)
      }
    }
    case 'SET_CONTAINS_OBJ': {
      // console.log('Setting contains obj!');
      return {
        ...state,
        containsObj: action.payload
      }
    }
    default: {
      return state
    }
  }
}