import axios from "axios";

import userActions from "./userActions";

axios.defaults.baseURL = "https://goit-phonebook-api.herokuapp.com/";
axios.defaults.headers.get["Accept"] = "application/json";

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = "";
  },
};

const registerUser = (item) => async (dispatch) => {
  try {
    await dispatch(userActions.registerUserRequest());
    const response = await axios.post(`users/signup`, item);
    await token.set(response.data.token);
    await dispatch(userActions.registerUserSuccess(response.data));
    return;
  } catch (error) {
    return dispatch(userActions.registerUserError(error.message));
  }
};

const loginUser = (item) => async (dispatch) => {
  try {
    await dispatch(userActions.loginUserRequest());
    const response = await axios.post(`users/login`, item);
    await token.set(response.data.token);
    await dispatch(userActions.loginUserSuccess(response.data));
    return;
  } catch (error) {
    return dispatch(userActions.loginUserError(error.message));
  }
};

const logoutUser = () => async (dispatch) => {
  try {
    await dispatch(userActions.logoutUserRequest());
    await axios.post(`users/logout`);
    await token.unset();
    await dispatch(userActions.logoutUserSuccess());

    return;
  } catch (error) {
    return dispatch(userActions.logoutUserError(error.message));
  }
};

const currentUser = () => async (dispatch, getState) => {
  try {
    const {
      authUser: { token: persistedToken },
    } = await getState();
    if (!persistedToken) return;
    await token.set(persistedToken);
    await dispatch(userActions.currentUserRequest());
    const response = await axios.get(`users/current`);
    await dispatch(userActions.currentUserSuccess(response.data));
    return;
  } catch (error) {
    return dispatch(userActions.currentUserError(error.message));
  }
};

export default {
  logoutUser,
  registerUser,
  loginUser,
  currentUser,
};
