const userReducer = (state = null, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action?.payload?.data?.user };
    case "LOGOUT":
      sessionStorage.removeItem("user");
      return null;
    default:
      return state;
  }
};
export default userReducer;
