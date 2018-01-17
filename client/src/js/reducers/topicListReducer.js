export default function reducer(state = {
  topicList: []
}, action) {
  switch (action.type) {
    case 'ADD_TOPIC_TO_LIST': {
      console.log('adding topic to list', action.payload, state.topicList);
      return {
        ...state,
        topicList: state.topicList.concat(action.payload)
      }
    }
    default: {
      return state
    }
  }
}