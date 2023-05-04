import { Logo } from './components/Logo/Logo.jsx';
import { Button } from '../../common/Button/Button.jsx';
import { BUTTON_TEXT_HEADER } from '../../constants.js';
import './header.css';
export const Header = () => {
  return (
    <div className='app-header'>
      <Logo />
      <div className='app-header__user-logout'>
        <p>Andrea</p>
        <Button text={BUTTON_TEXT_HEADER} />
      </div>
    </div>
  );
};
