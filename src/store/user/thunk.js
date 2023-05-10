import * as creators from './actionCreators';
export const loginAccess = (user) => {
  return async (dispatch) => {
    dispatch(creators.fetchUserRequest());
    const response = await fetch('http://localhost:4000/login', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();
    if (!result.successful) {
      dispatch(creators.fetchUserFailure(result.error));
    } else {
    }
  };
};

export const getUser = (auth) => {
  return async (dispatch) => {
    dispatch(creators.fetchUserRequest());
    const response = await fetch('http://localhost:4000/users/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: auth,
      },
    });
    const result = await response.json();
    if (result.successful) {
      dispatch(creators.login(result.result));
    }
  };
};
