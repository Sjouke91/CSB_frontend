const initialState = {
  status: "loading",
  data: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "GET_SPACES":
      return { ...state, data: [...payload.spaces], status: payload.status };

    default:
      return state;
  }
};
