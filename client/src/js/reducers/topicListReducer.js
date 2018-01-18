export default function reducer(state = {
  fullTopicList: [],
  searchedTopicList: [],
  filteredTopicList: []
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
    case 'CHANGE_SEARCHED_LIST': {
      console.log('changing searched list action');
      return {
        ...state,
        searchedTopicList: action.payload
      }
    }
    case 'CHANGE_FILTERED_LIST': {
      console.log('changing filtered list action');
      return {
        ...state,
        filteredTopicList: action.payload
      }
    }
    default: {
      return state
    }
  }
}