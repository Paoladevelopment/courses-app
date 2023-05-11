import * as actions from './actionTypes';

export const login = (token) => {
  return {
    type: actions.LOGIN,
    payload: token,
  };
};

export const logout = () => {
  return {
    type: actions.LOGOUT,
  };
};

export const getUser = (user) => {
  return {
    type: actions.GET_USER,
    payload: { user },
  };
};
