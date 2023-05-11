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
        ...state,
        token: action.payload,
      };
    case actions.LOGOUT:
      return {
        isAuth: false,
        name: '',
        email: '',
        token: '',
        role: '',
      };
    case actions.GET_USER:
      return {
        isAuth: true,
        name: action.payload.user.name,
        email: action.payload.user.email,
        token: '',
        role: action.payload.user.role,
      };
    default:
      return state;
  }
};
