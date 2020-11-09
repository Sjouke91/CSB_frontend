import axios from "axios";
import { apiUrl } from "../../config/constants";

export const getSpaces = () => async (dispatch, getState) => {
  try {
    const spaces = await axios.get(`${apiUrl}/spaces`);
    console.log(spaces.data);
    dispatch(pushSpaces(spaces.data));
  } catch (e) {
    console.log(e.message);
  }
};

const pushSpaces = (spaces) => {
  return { type: "GET_SPACES", payload: spaces };
};