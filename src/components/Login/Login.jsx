import { Input } from '../../common/Input/Input';
import { Button } from '../../common/Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';
import { useState } from 'react';
import { loginAccess, getUser } from '../../store/user/thunk';
import { useDispatch } from 'react-redux';
export const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [error, setError] = useState('');
  let navigation = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userLog = {
      email,
      password,
    };
    const result = await loginAccess(userLog);
    if (result.emailError) {
      setError('');
      setEmailError(result.emailError);
    } else if (result.error) {
      setEmailError('');
      setError(result.error);
    } else {
      localStorage.setItem('userToken', result);
      dispatch(getUser(result));
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
