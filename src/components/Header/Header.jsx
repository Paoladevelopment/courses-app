import { Logo } from './components/Logo/Logo.jsx';
import { Button } from '../../common/Button/Button.jsx';
import { BUTTON_TEXT_HEADER } from '../../constants.js';
import './header.css';
import { useNavigate } from 'react-router-dom';
export const Header = ({ isVisibleAllHeader, handleLogout }) => {
  let name = '';
  if (localStorage.getItem('userToken')) {
    const user = localStorage.getItem('userToken');
    name = JSON.parse(user).name;
  }
  let navigation = useNavigate();
  const logout = () => {
    handleLogout();
    navigation('/login');
  };
  return (
    <div className='app-header'>
      <Logo />
      {isVisibleAllHeader && (
        <div className='app-header__user-logout'>
          <p>{name}</p>
          <Button text={BUTTON_TEXT_HEADER} onClick={logout} />
        </div>
      )}
    </div>
  );
};
