export default function reducer(state = {
  fullTopicList: [],
  viewedTopicList: [],
  topicList: [],
  selectedTopic: {},
  detailedTopic: {}
}, action) {
  switch (action.type) {
    case 'ADD_TOPIC_TO_LIST': {
      console.log('adding topic to list');
      return {
        ...state,
        fullTopicList: state.fullTopicList.concat(action.payload)
      }
    }
    case 'ADD_TOPIC_TO_LIST_FRONT': {
      console.log('adding topic to list front');
      return {
        ...state,
        fullTopicList: [action.payload].concat(state.fullTopicList)
      }
    }
    case 'CHANGE_VIEWED_LIST': {
      console.log('changing viewed list action');
      return {
        ...state,
        viewedTopicList: action.payload
      }
    }
    case 'SET_SELECTED_TOPIC': {
      console.log('Setting selected item in reducer!');
      return {
        ...state,
        topicList: { ...state.topicList, selectedTopic: action.payload }
      }
    }
    case 'SET_DETAILED_TOPIC': {
      console.log('Setting detailed topic in reducer!');
      console.log(action.payload);
      return {
        ...state,
        topicList: { ...state.topicList, detailedTopic: action.payload }
      }
    }
    default: {
      return state
    }
  }
}