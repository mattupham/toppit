export default function reducer(state = {
  topic: {
    headline: '',
    description: '',
    emotion: '',
    anon: false,
    commentText: '',
    upvoteStateColor: 'grey',
    displayNewTopic: false
  },
  fetching: false,
  fetched: false,
  error: null
}, action) {
  switch (action.type) {
    case 'DISPLAY_NEW_TOPIC': {
      console.log('Setting display new topic in reducer!');
      return {
        ...state,
        topic: { ...state.topic, displayNewTopic: action.payload }
      }
    }
    case 'SET_HEADLINE': {
      console.log('Setting headline in reducer!');
      return {
        ...state,
        topic: { ...state.topic, headline: action.payload }
      }
    }
    case 'SET_DESCRIPTION': {
      console.log('Setting description in reducer!');
      return {
        ...state,
        topic: { ...state.topic, description: action.payload }
      }
    }
    case 'SET_EMOTION': {
      console.log('Setting emotion in reducer!');
      return {
        ...state,
        topic: { ...state.topic, emotion: action.payload }
      }
    }
    case 'SET_ANON': {
      console.log('Setting anon in reducer!');
      return {
        ...state,
        topic: { ...state.topic, anon: action.payload }
      }
    }
    case 'SET_COMMENT_TEXT': {
      console.log('Setting comment text in reducer!');
      return {
        ...state,
        topic: { ...state.topic, commentText: action.payload }
      }
    }
    case 'SET_UPVOTE_STATE_COLOR': {
      console.log('Setting upvote state color in reducer!');
      return {
        ...state,
        topic: { ...state.topic, upvoteStateColor: action.payload }
      }
    }
    default: {
      return state
    }
  }
}