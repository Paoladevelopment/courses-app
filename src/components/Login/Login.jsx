import { Input } from '../../common/Input/Input';
import { Button } from '../../common/Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';
import { useState } from 'react';

export const Login = ({ giveAccessTo }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  let navigation = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userLog = {
      email,
      password,
    };
    const response = await fetch('http://localhost:4000/login', {
      method: 'POST',
      body: JSON.stringify(userLog),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();
    if (!result.successful) {
      const { errors } = result;
      if (errors) {
        setEmailError('Enter a valid email.');
        setError('');
      } else {
        setEmailError('');
        setError('Invalid data: Try again or register.');
      }
    } else {
      const userToken = {
        token: result.result,
        name: result.user.name,
      };
      localStorage.setItem('userToken', JSON.stringify(userToken));
      giveAccessTo(userToken);
      navigation('/courses');
    }
  };

  return (
    <div className='app-login'>
      <h1 className='app-login__title'>Login</h1>
      <form className='app-login__form' onSubmit={handleSubmit}>
        <div className='app-login__field'>
          <Input
            labelText={'Email'}
            id={'email'}
            placeholder='Enter email'
            type='text'
            isRequired={true}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <p>{emailError}</p>}
        </div>

        <div className='app-login__field'>
          <Input
            labelText={'Password'}
            id={'password'}
            placeholder='Enter password'
            type='password'
            isRequired={true}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p>{error}</p>}
        </div>
        <Button text='Login' type='submit' />
      </form>
      <p>
        If you not have an account you can
        <Link to='/registration' className='app-login__nav'>
          Registration.
        </Link>
      </p>
    </div>
  );
};
