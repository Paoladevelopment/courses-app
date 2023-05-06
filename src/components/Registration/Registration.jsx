import { Input } from '../../common/Input/Input';
import { Button } from '../../common/Button/Button';
import { useState } from 'react';
import './registration.css';
import { Link, useNavigate } from 'react-router-dom';

export const Registration = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passError, setPassError] = useState('');
  let navigation = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      name,
      password: pass,
      email,
    };
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
        setPassError('');
        setEmailError('');
        navigation('/login');
      } else {
        console.log(result);
        if (result.errors.length > 1) {
          setPassError('Password should be 6 characters minimum');
          setEmailError('Invalid email or email already exist.');
        } else {
          if (result.errors[0].includes('email')) {
            setPassError('');
            setEmailError('Invalid email or email already exist.');
          } else if (result.errors[0].includes('password')) {
            setEmailError('');
            setPassError('Password should be 6 characters minimum');
          }
        }
      }
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div className='app-registration'>
      <h1>Registration</h1>
      <form className='app-registration__form' onSubmit={handleSubmit}>
        <div className='app-registration__field'>
          <Input
            labelText={'Name'}
            id={'name'}
            placeholder='Enter name'
            type='text'
            isRequired={true}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className='app-registration__field'>
          <Input
            labelText={'Email'}
            id={'email'}
            placeholder='Enter email'
            isRequired={true}
            type='text'
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <p>{emailError}</p>}
        </div>

        <div className='app-registration__field'>
          <Input
            labelText={'Password'}
            id={'password'}
            placeholder='Enter password'
            type='password'
            isRequired={true}
            onChange={(e) => setPass(e.target.value)}
          />
          {passError && <p>{passError}</p>}
        </div>
        <Button text='Registration' type='submit' />
      </form>
      <p>
        If you have an account you can
        <Link to='/login' className='app-registration__nav'>
          Login.
        </Link>
      </p>
    </div>
  );
};
