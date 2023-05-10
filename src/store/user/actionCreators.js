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
