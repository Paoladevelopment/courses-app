import { useState } from 'react';
import { Button } from '../../../../common/Button/Button';
import { Input } from '../../../../common/Input/Input';
import './searchBar.css';
import {
  PLACEHOLDER_SEARCHBAR,
  BUTTON_TEXT_SEARCHBAR,
} from '../../../../constants';

export const SearchBar = (props) => {
  const { onSearch, clearSearch } = props;
  const [toSearch, setToSearch] = useState('');
  const handlerClick = () => {
    onSearch(toSearch);
  };
  const handleInput = (e) => {
    if (e.target.value === '') {
      clearSearch();
    } else {
      setToSearch(e.target.value);
    }
  };

  return (
    <div className='app-searchBar'>
      <Input
        placeholder={PLACEHOLDER_SEARCHBAR}
        type='text'
        onChange={handleInput}
      />
      <Button text={BUTTON_TEXT_SEARCHBAR} onClick={handlerClick} />
    </div>
  );
};
