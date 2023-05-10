import { Logo } from './components/Logo/Logo.jsx';
import { Button } from '../../common/Button/Button.jsx';
import { BUTTON_TEXT_HEADER } from '../../constants.js';
import './header.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../store/user/thunk.js';

import { getAuth, getToken, getUserName } from '../../store/user/selectors.js';
export const Header = () => {
  const dispatch = useDispatch();
  const isVisibleAllHeader = useSelector(getAuth);
  const name = useSelector(getUserName);
  const token = useSelector(getToken);
  let navigation = useNavigate();
  const logginOut = () => {
    localStorage.removeItem('userToken');
    dispatch(logOut(token));
    navigation('/login');
  };
  return (
    <div className='app-header'>
      <Logo />
      {isVisibleAllHeader && (
        <div className='app-header__user-logout'>
          <p>{name}</p>
          <Button text={BUTTON_TEXT_HEADER} onClick={logginOut} />
        </div>
      )}
    </div>
  );
};
