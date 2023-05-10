import * as actions from './actionTypes';

const userInitialState = {
  loading: false,
  user: {
    isAuth: '',
    name: '',
    email: '',
    token: '',
    role: '',
  },
  error: '',
};

export const reducerUser = (state = userInitialState, action) => {
  switch (action.type) {
    case actions.LOGIN:
      return {
        ...state,
        user: {
          isAuth: true,
          name: action.payload.user.name,
          email: action.payload.user.email,
          token: action.payload.user.token,
          role: action.payload.user.role,
        },
      };
    default:
      return state;
  }
};
