export const setFilter = (filterType) => {
  //change filter
  console.log('setFilter type: ', filterType)
  return {
    type: "SET_FILTER",
    payload: filterType
  }
}

export const setSort = (sortType) => {
  //change filter
  console.log('setSort type: ', sortType)
  return {
    type: "SET_SORT",
    payload: sortType
  }
}