export default function reducer(state = {
  comment: {
    commentText: 'home'
  }
}, action) {
  switch (action.type) {
    case 'SET_REPLY_TEXT': {
      // console.log('Setting active item in reducer!');
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