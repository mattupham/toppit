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
export default function setUtilsBarState(state = {
  utilsBar: {
    filterBy: '',
    sortBy: ''
  }
}, action){
  switch (action.type) {
    case "SET_FILTER":
      return action.filter;
    case "SET_SORT":
      return action.sort;
    default:
      return state;
  };
}