export default function reducer(state = {
  user: {
    id: 1,
    username: 'user',
    password: 1234,
    confirm: 1234,
    pwStrength: 0,
    pwStrengthColor: 'grey',
    pwStrengthPhase: 'password strength',
    pwError: false,
    usernameError: false,
    signInError: '',
    signUpError: ''
  },
  fetching: false,
  fetched: false,
  error: null
}, action) {
  switch (action.type) {
    case 'SET_USER_ID': {
      console.log('Setting user id in reducer!');
      return {
        ...state,
        user: { ...state.user, id: action.payload }
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
    case 'SET_USER_CONFIRM': {
      console.log('Setting confirm password in reducer!');
      return {
        ...state,
        user: { ...state.user, confirm: action.payload }
      }
    }
    case 'SET_USER_PW_STRENGTH': {
      console.log('Setting user password strength in reducer!');
      return {
        ...state,
        user: { ...state.user, pwStrength: action.payload }
      }
    }
    case 'SET_USER_PW_STRENGTH_COLOR': {
      console.log('Setting user password strength color in reducer!');
      return {
        ...state,
        user: { ...state.user, pwStrengthColor: action.payload }
      }
    }
    case 'SET_USER_PW_STRENGTH_PHRASE': {
      console.log('Setting user password strength phrase in reducer!');
      return {
        ...state,
        user: { ...state.user, pwStrengthPhrase: action.payload }
      }
    }
    case 'SET_USER_PW_ERROR': {
      console.log('Setting user password error in reducer');
      return {
        ...state,
        user: { ...state.user, pwError: action.payload }
      }
    }
    case 'SET_USERNAME_ERROR': {
      console.log('Setting username error in reducer');
      return {
        ...state,
        user: { ...state.user, usernameError: action.payload }
      }
    }
    case 'SET_SIGN_IN_ERROR': {
      console.log('Setting sign in error in reducer');
      return {
        ...state,
        user: { ...state.user, signInError: action.payload }
      }
    }
    case 'SET_SIGN_UP_ERROR': {
      console.log('Setting sign up error in reducer');
      return {
        ...state,
        user: { ...state.user, signUpError: action.payload }
      }
    }
    // case 'FETCH_USER': {
    //   return { ...state, fetching: true }
    // }
    // case 'FETCH_USER_REJECTED': {
    //   return { ...state, fetching: false }
    // }
    // case 'FETCH_USER_FULFILLED': {
    //   return {
    //     ...state,
    //     fetching: false,
    //     fetched: true,
    //     user: action.payload
    //   }
    // }
    default: 
      return state
  }
}