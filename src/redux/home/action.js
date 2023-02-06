export const getData = (data) => {
  return {
    type: "GETDATA",
    payload: data,
  };
};
