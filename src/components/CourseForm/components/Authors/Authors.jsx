import { Button } from '../../../../common/Button/Button';
import './authors.css';
export const Authors = ({ listAuthors, textButton, onAdd, onDelete }) => {
  const onChange = (au) => {
    if (textButton === 'Add author') {
      onAdd(au);
    } else {
      onDelete(au);
    }
  };
  const handleClick = (id) => {
    listAuthors.forEach((au) => {
      if (au.id === id) {
        return onChange(au);
      }
    });
  };
  return (
    <>
      {listAuthors.map((author) => {
        return (
          <div key={author.id} className='app-createCourse__author'>
            <p>{author.name}</p>
            <Button
              text={textButton}
              type='button'
              onClick={() => handleClick(author.id)}
            />
          </div>
        );
      })}
    </>
  );
};
