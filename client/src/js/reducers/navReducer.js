export default function reducer(state = {
  nav: {
    activeItem: 'home'
  },
  fetching: false,
  fetched: false,
  error: null
}, action) {
  switch (action.type) {
    case 'SET_ACTIVE_ITEM': {
      console.log('Setting active item in reducer!');
      return {
        ...state,
        nav: { ...state.nav, activeItem: action.payload }
      }
    }
    default: {
      return state
    }
  }
}