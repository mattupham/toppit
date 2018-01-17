export const selectFilter = (filterType) => {
  //change filter
  return {
    type: "SET_FILTER",
    payload: filterType
  }
}

export const selectSort = (sortType) => {
  //change filter
  return {
    type: "SET_SORT",
    payload: sortType
  }
}