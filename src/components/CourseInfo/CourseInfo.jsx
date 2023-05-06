import { useNavigate, useParams } from 'react-router-dom';
import { getCourse } from '../../helpers/courseById';
import { getDateInFormat } from '../../helpers/dateGeneratop';

import { getHoursDuration } from '../../helpers/pipeDuration';
import './courseInfo.css';
import { getAuthorName } from '../../helpers/authorByName';
import { Button } from '../../common/Button/Button';

export const CourseInfo = () => {
  const { courseId } = useParams();
  const course = getCourse(courseId);
  let navigation = useNavigate();
  const handleBackToCourse = () => {
    navigation('/courses');
  };
  return (
    <>
      {course ? (
        <>
          <div className='app-courseInfo__btn'>
            <Button
              text='< Back to courses'
              type='button'
              onClick={handleBackToCourse}
            />
          </div>
          <div className='app-courseInfo'>
            <h1 className='app-courseInfo__title'>{course.title}</h1>
            <div className='app-courseInfo__info'>
              <p className='app-courseInfo__description'>
                {course.description}
              </p>
              <div className='app-courseInfo__detailed'>
                <p>
                  <span> ID: </span> {courseId}
                </p>
                <p>
                  <span>Duration: </span>
                  {getHoursDuration(course.duration)} hours
                </p>
                <p>
                  <span>Created: </span>
                  {getDateInFormat(course.creationDate)}
                </p>
                <p>
                  <span>Authors: </span>
                </p>
                <pre>{getAuthorName(course.authors).join('\n')}</pre>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className='app-courseInfo--notFound'>
          <p>Not found</p>
        </div>
      )}
    </>
  );
};
