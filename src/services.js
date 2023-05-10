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

const updateCourseId = async (id, info, token) => {
  const response = await fetch(`http://localhost:4000/courses/${id}`, {
    method: 'PUT',
    body: JSON.stringify(info),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    },
  });

  const result = await response.json();
  return result;
};

export { registerNewUser, updateCourseId };
