export default function reducer(state = {
  fullTopicList: [],
  viewedTopicList: [],
  topicList: [],
  selectedTopic: {},
  detailedTopic: {
    authorId: null,
    commentText: '',
    commentId: [],
    headline: '',
    description: '',
    emotion: '',
    timeStamp: '',
    upvoteUsers: [],
    upvotes: 0
  },
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
        selectedTopic: action.payload
      }
    }
    case 'SET_DETAILED_TOPIC': {
      console.log('Setting detailed topic in reducer!');
      console.log(action.payload);
      return {
        ...state,
        detailedTopic: action.payload
      }
    }
    case 'SET_COMMENT_TEXT': {
      console.log('Setting comment text in reducer!');
      return {
        ...state,
        detailedTopic: { ...state.topicList, commentText: action.payload }
      }
    }
    case 'SET_COMMENT_LIST': {
      console.log('Setting comment list in reducer!');
      return {
        ...state,
        detailedTopic: { ...state.topicList, commentId: action.payload }
      }
    }
    case 'ADD_COMMENT': {
      console.log('Adding comment in reducer!');
      return {
        ...state,
        detailedTopic: { 
          ...state.topicList, 
          commentId: state.topicList.selectedTopic.commentId.concat(action.payload) 
        }
      }
    }
    default: {
      return state
    }
  }
}