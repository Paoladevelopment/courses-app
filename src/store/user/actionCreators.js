import * as actions from './actionTypes';

export const login = (user) => {
  return {
    type: actions.LOGIN,
    payload: { user },
  };
};

export const logout = () => {
  return {
    type: actions.LOGOUT,
  };
};

export const fetchUserRequest = () => {
  return {
    type: actions.FETCH_USER_REQUEST,
  };
};

export const fetchUserSuccess = (user) => {
  return {
    type: actions.FETCH_USER_SUCCESS,
    payload: {
      user,
    },
  };
};

export const fetchUserFailure = (error) => {
  return {
    type: actions.FETCH_USER_FAILURE,
    payload: {
      error,
    },
  };
};
