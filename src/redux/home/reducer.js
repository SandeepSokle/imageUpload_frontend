const homeReducer = (state = { allData: [] }, action) => {
  switch (action.type) {
    case "GETDATA":
      return { ...state, allData: action.payload };
    default:
      return state;
  }
};
export default homeReducer;
