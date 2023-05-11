import { useNavigate } from 'react-router-dom';
import { Button } from '../../../../common/Button/Button';
import { BUTTON_TEXT_COUSECARD } from '../../../../constants';
import './courseCard.css';
import editImg from '../../../../assets/draw.png';
import deleteImg from '../../../../assets/delete.png';
import { useDispatch, useSelector } from 'react-redux';
import { getRole } from '../../../../store/user/selectors';
import { deleteCourse } from '../../../../store/courses/thunk';
export const CourseCard = (props) => {
  const dispatch = useDispatch();
  const role = useSelector(getRole);
  const { id, title, description, creationDate, duration, authors } = props;
  let navigation = useNavigate();
  const courseDelete = (id) => {
    dispatch(deleteCourse(id));
  };
  return (
    <div className='app-courseCard'>
      <div className='app-courseCard__general-info'>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      <div className='app-courseCard__detailed-info'>
        <p>
          <b>Authors:</b>
          {''} {authors}
        </p>
        <p>
          <b>Duration:</b>
          {''} {duration} hours
        </p>
        <p>
          <b>Created:</b> {''} {creationDate}
        </p>
        <div className='app-courseCard__btns'>
          <Button
            text={BUTTON_TEXT_COUSECARD}
            onClick={() => navigation(`/courses/${id}`)}
          />
          {role === 'admin' ? (
            <>
              <Button
                imageSrc={editImg}
                description='edit icon'
                onClick={() => navigation(`/courses/update/${id}`)}
              />
              <Button
                imageSrc={deleteImg}
                description='delete icon'
                onClick={() => courseDelete(id)}
              />
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};
