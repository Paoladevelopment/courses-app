const loginAccess = async (user) => {
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

  return {
    token: result.result,
    name: result.user.name,
  };
};

const registerNewUser = async (newUser) => {
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

const getAllAuthors = async () => {
  const response = await fetch('http://localhost:4000/authors/all');

  const result = await response.json();
  return result.result;
};

const getAllCourses = async () => {
  const response = await fetch('http://localhost:4000/courses/all');
  const result = await response.json();
  return result.result;
};

export { loginAccess, registerNewUser, getAllAuthors, getAllCourses };
