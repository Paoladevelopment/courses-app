import { Logo } from './components/Logo/Logo.jsx';
import { Button } from '../../common/Button/Button.jsx';
import { BUTTON_TEXT_HEADER } from '../../constants.js';
import './header.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/user/actionCreators.js';
export const Header = () => {
  const dispatch = useDispatch();
  const isVisibleAllHeader = useSelector((state) => state.user.isAuth);
  const name = useSelector((state) => state.user.name);
  let navigation = useNavigate();
  const logginOut = () => {
    localStorage.removeItem('userToken');
    dispatch(logout());
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
