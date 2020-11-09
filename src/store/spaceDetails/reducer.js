const initialState = {
  status: "loading",
  data: {},
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "GET_SPACE_DETAILS":
      return {
        ...state,
        data: { ...payload.spaceDetails },
        status: payload.status,
      };

    default:
      return state;
  }
};
