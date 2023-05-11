import * as creators from './actionCreators';

export const loginAccess = async (user) => {
  const response = await fetch('http://localhost:4000/login', {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const result = await response.json();
  if (!result.successful) {
    const { errors } = result;
    if (errors) {
      return { emailError: 'Enter a valid email' };
    } else {
      return { error: 'Invalid data: Try again or register.' };
    }
  }

  return result.result;
};

export const registerNewUser = async (newUser) => {
  try {
    const response = await fetch('http://localhost:4000/register', {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();
    if (result.successful) {
      return { result: result.result };
    } else {
      if (result.errors.length > 1) {
        return {
          passError: 'Password should be 6 characters minimum',
          emailError: 'Invalid email or email already exist.',
        };
      } else {
        if (result.errors[0].includes('email')) {
          return {
            emailError: 'Invalid email or email already exist.',
          };
        } else if (result.errors[0].includes('password')) {
          return {
            passError: 'Password should be 6 characters minimum',
          };
        }
      }
    }
  } catch (error) {
    return { error: error };
  }
};

export const getUser = (userToken) => {
  return async (dispatch) => {
    const response = await fetch('http://localhost:4000/users/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: userToken,
      },
    });
    const result = await response.json();
    if (result.successful) {
      dispatch(creators.getUser(result.result));
      dispatch(creators.login(userToken));
    }
  };
};

export const logOut = (userToken) => {
  return async (dispatch) => {
    const response = await fetch('http://localhost:4000/logout', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: userToken,
      },
    });
    dispatch(creators.logout());
  };
};
