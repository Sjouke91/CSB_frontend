import axios from "axios";
import { apiUrl } from "../../config/constants";

export const getSpaceDetails = (id) => async (dispatch, getState) => {
  dispatch(loadingSpaceDetails());
  try {
    const spaceDetails = await axios.get(`${apiUrl}/spaces/${id}`);
    console.log("this is details", spaceDetails.data);
    dispatch(pushSpaceDetails(spaceDetails.data));
  } catch (e) {
    console.log(e.message);
  }
};

const pushSpaceDetails = (spaceDetails) => {
  return {
    type: "GET_SPACE_DETAILS",
    payload: { status: "Done", spaceDetails: spaceDetails },
  };
};

const loadingSpaceDetails = () => {
  return {
    type: "GET_SPACE_DETAILS",
    payload: { status: "Loading", spaces: [] },
  };
};
