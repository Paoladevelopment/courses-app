import * as actions from './actionTypes';

const userInitialState = {
  isAuth: '',
  name: '',
  email: '',
  token: '',
  role: '',
};

export const reducerUser = (state = userInitialState, action) => {
  switch (action.type) {
    case actions.LOGIN:
      return {
        isAuth: true,
        name: action.payload.user.name,
        email: action.payload.user.email,
        token: action.payload.user.token,
        role: action.payload.user.role,
      };
    case actions.LOGOUT:
      return {
        isAuth: false,
        name: '',
        email: '',
        token: '',
        role: '',
      };
    default:
      return state;
  }
};
