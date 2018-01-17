export default function reducer(state = {
  searchValue: '',
  isLoading: false
}, action) {
  switch (action.type) {
    case 'SET_SEARCH_VALUE': {
      return {
        ...state,
        searchValue: action.payload        
      }
    }
    case 'TOGGLE_IS_LOADING': {
      return {
        ...state,
        isLoading: !state.isLoading
      }
    }
    default: 
      return state
  }
}