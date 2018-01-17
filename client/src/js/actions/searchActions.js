export const SET_SEARCH_VALUE = 'SET_SEARCH_VALUE';
export const TOGGLE_IS_LOADING = 'TOGGLE_IS_LOADING';


export const setSearchValue = (value) => {
  console.log(value, 'in actions')
  return {
    type: 'SET_SEARCH_VALUE',
    payload: value
  };
};

export const toggleIsLoading = () => {
  console.log('toggle loading in actions');
  return {
    type: 'TOGGLE_IS_LOADING'
  };
};
