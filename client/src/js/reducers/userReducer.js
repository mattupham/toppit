export default function reducer(state = {
  user: {
    id: 1,
    username: 'albertchanged',
    password: 1234
  },
  fetching: false,
  fetched: false,
  error: null
}, action) {
  switch (action.type) {
    case 'FETCH_USER': {
      return { ...state, fetching: true }
    }
    case 'FETCH_USER_REJECTED': {
      return { ...state, fetching: false }
    }
    case 'FETCH_USER_FULFILLED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        user: action.payload
      }
    }
    case 'SET_USER_NAME': {
      console.log('Setting username in reducer!');
      return {
        ...state,
        user: { ...state.user, username: action.payload }
      }
    }
    case 'SET_USER_PASSWORD': {
      console.log('Setting password in reducer!');
      return {
        ...state,
        user: { ...state.user, password: action.payload }
      }
    }
    default: 
      return state
  }
}