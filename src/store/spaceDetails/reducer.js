const initialState = {
  status: "loading",
  space: { stories: [] },
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "GET_SPACE_DETAILS":
      return {
        ...state,
        space: { ...payload.spaceDetails },
        status: payload.status,
      };

    default:
      return state;
  }
};
