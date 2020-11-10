import { apiUrl } from "../../config/constants";
import axios from "axios";
import { selectToken, selectUser } from "./selectors";
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
  setMessage,
} from "../appState/actions";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const TOKEN_STILL_VALID = "TOKEN_STILL_VALID";
export const LOG_OUT = "LOG_OUT";
export const EDIT_USER = "EDIT_USER";

const loginSuccess = (userWithToken) => {
  return {
    type: LOGIN_SUCCESS,
    payload: userWithToken,
  };
};

const tokenStillValid = (userWithoutToken) => ({
  type: TOKEN_STILL_VALID,
  payload: userWithoutToken,
});

export const logOut = () => ({ type: LOG_OUT });

export const signUp = (name, email, password) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const newUser = await axios.post(`${apiUrl}/signup`, {
        name,
        email,
        password,
      });

      dispatch(loginSuccess(newUser.data));
      dispatch(showMessageWithTimeout("success", true, "account created"));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const login = (email, password) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/login`, {
        email,
        password,
      });

      console.log("this is response: login", response);

      dispatch(loginSuccess(response.data));
      dispatch(showMessageWithTimeout("success", false, "welcome back!", 1500));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const getUserWithStoredToken = () => {
  return async (dispatch, getState) => {
    // get token from the state
    const token = selectToken(getState());

    // if we have no token, stop
    if (token === null) return;

    dispatch(appLoading());
    try {
      // if we do have a token,
      // check wether it is still valid or if it is expired
      const response = await axios.get(`${apiUrl}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("this is response", response);

      // token is still valid
      dispatch(tokenStillValid(response.data));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.message);
      } else {
        console.log(error);
      }
      // if we get a 4xx or 5xx response,
      // get rid of the token by logging out
      dispatch(logOut());
      dispatch(appDoneLoading());
    }
  };
};

export const DeleteStoryWithToken = (id) => {
  console.log("do i get here?", id);
  return async (dispatch, getState) => {
    const token = selectToken(getState());

    if (token === null) return;
    try {
      const response = await axios.delete(`${apiUrl}/stories/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("this is response", response);
      dispatch(getUserWithStoredToken());
    } catch (error) {
      if (error.response) {
        console.log(error.response.message);
      } else {
        console.log(error);
      }
    }
  };
};

export const postStory = (name, content, imageUrl) => async (
  dispatch,
  getState
) => {
  console.log("do I get here?", name, content, imageUrl);
  const user = getState().user;

  try {
    const newPost = await axios.post(
      `${apiUrl}/spaces/${user.space.id}/stories`,
      { name, content, imageUrl },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    dispatch(getUserWithStoredToken());
  } catch (e) {
    console.log(e.message);
  }
};

export const updateSpace = (
  title,
  description,
  backgroundColor,
  color
) => async (dispatch, getState) => {
  const user = getState();
  try {
    const newSpace = await axios.patch(
      `${apiUrl}/spaces/${user.space.id}`,
      {
        title,
        description,
        backgroundColor,
        color,
      },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    console.log("this is response", newSpace);

    dispatch(editUser(newSpace));
  } catch (e) {
    console.log(e.message);
  }
};

export const editUser = (newSpace) => {
  return {
    type: EDIT_USER,
    payload: newSpace,
  };
};
