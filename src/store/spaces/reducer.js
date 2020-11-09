const initialState = {
  all: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "GET_SPACES":
      return { ...state, all: [...payload] };

    default:
      return state;
  }
};
