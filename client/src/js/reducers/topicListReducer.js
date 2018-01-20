export default function reducer(state = {
  subtoppitView: 'home',
  fullTopicList: [],
  searchedTopicList: [],
  filteredTopicList: [],
  selectedTopic: {},
  detailedTopic: {
    authorId: '',
    commentId: []
  },
  commentList: []
}, action) {
  switch (action.type) {
    case 'ADD_TOPIC_TO_LIST': {
      // console.log('adding topic to list');
      return {
        ...state,
        fullTopicList: state.fullTopicList.concat(action.payload)
      }
    }
    case 'ADD_TOPIC_TO_LIST_FRONT': {
      // console.log('adding topic to list front');
      return {
        ...state,
        fullTopicList: [action.payload].concat(state.fullTopicList)
      }
    }
    case 'CHANGE_SEARCHED_LIST': {
      // console.log('changing searched list action');
      return {
        ...state,
        searchedTopicList: action.payload
      }
    }
    case 'CHANGE_FILTERED_LIST': {
      // console.log('changing filtered list action');
      return {
        ...state,
        filteredTopicList: action.payload
      }
    }
    case 'SET_SELECTED_TOPIC': {
      // console.log('Setting selected item in reducer!');
      return {
        ...state,
        selectedTopic: action.payload
      }
    }
    case 'SET_DETAILED_TOPIC': {
      // console.log('Setting detailed topic in reducer!');
      return {
        ...state,
        detailedTopic: action.payload
      }
    }
    case 'SET_COMMENT_LIST': {
      // console.log('Setting detailed comment list in reducer!');
      return {
        ...state,
        detailedTopic: { 
          ...state.detailedTopic, 
          commentId: action.payload
        }
      }
    }
    case 'SET_TOPIC_COMMENTS': {
      // console.log('Setting topic comments in reducer!');
      return {
        ...state,
        commentList: action.payload
      }
    }
    case 'ADD_COMMENT': {
      // console.log('Adding comment in reducer!');
      return {
        ...state,
        selectedTopic: { 
          ...state.topicList, 
          commentId: state.selectedTopic.commentId.concat(action.payload) 
        }
      }
    }
    case 'ADD_COMMENT_TO_FRONT': {
      // console.log('Adding comment to front!');
      return {
        ...state,
        commentList: state.commentList.concat(action.payload)
      }
    }
    default: {
      return state
    }
  }
}