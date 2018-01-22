export const setFilter = (filterType) => {
  //change filter
  // console.log('SET FILTER TRIGGERED type: ', filterType)
  return {
    type: "SET_FILTER",
    payload: filterType
  }
}

export const setSort = (sortType) => {
  //change filter
  // console.log('SET SORT TRIGGERED type: ', sortType)
  return {
    type: "SET_SORT",
    payload: sortType
  }
}