// this.state = ({
//   filterBy: props.defaultFilter,
//   sortBy: props.defaultSort
// });

//ACTIONS
/*
{ type: 'SET_FILTER', filter: '' }
{ type: 'SET_SORT', sort: '' }
*/

//REDUCER TIES TOGETHER STATE AND ACTIONS
export default function reducer(state = {
  filter: {
    filterBy: ''
  },
  sort: {
    sortBy: ''
  }
}, action){
  switch (action.type) {
    case "SET_FILTER":
    //keep sort the same, change filter
      return { 
        ...state, filter: { ...state.filter, filterBy: action.payload}
      }
    case "SET_SORT":
      return {
        ...state, sort: { ...state.sort, sortBy: action.payload}
      }
    default:
      return state;
  };
}