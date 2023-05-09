import * as actions from './actionTypes';

const userInitialState = (() => {
  if (localStorage.getItem('userToken')) {
    const userInfo = JSON.parse(localStorage.getItem('userToken'));
    return {
      isAuth: true,
      name: userInfo.name,
      email: userInfo.email,
      token: userInfo.token,
    };
  }
  return {
    isAuth: false,
    name: '',
    email: '',
    token: '',
  };
})();

export const reducerUser = (state = userInitialState, action) => {
  switch (action.type) {
    case actions.LOGIN:
      return {
        isAuth: true,
        name: action.payload.user.name,
        email: action.payload.user.email,
        token: action.payload.user.token,
      };
    case actions.LOGOUT:
      return {
        isAuth: false,
        name: '',
        email: '',
        token: '',
      };
    default:
      return state;
  }
};
