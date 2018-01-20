export default function reducer(state = {
  messages: [],
  user: '',
  usersTyping: []
}, action){
  switch(action.type){
    case 'message':
      return {
        ...state,
        messages: [...state.messages, [action.user, action.data]]
      }
    case 'typing':
      return {
        ...state,
        usersTyping: [...state.usersTyping, action.user]
      }
    case 'stopTyping':
      return {
        ...state,
        usersTyping: action.users
      }
    default:
      return state;
  }
}
