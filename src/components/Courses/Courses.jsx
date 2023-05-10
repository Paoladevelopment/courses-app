import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CourseCard } from './components/CourseCard/CourseCard';
import { SearchBar } from './components/SearchBar/SearchBar';
import { Button } from '../../common/Button/Button';
import { getAuthorName } from '../../helpers/authorByName';
import { getHoursDuration } from '../../helpers/pipeDuration';
import { getDateInFormat } from '../../helpers/dateGeneratop';
import './courses.css';
import { useSelector } from 'react-redux';
import { getCourses } from '../../store/courses/selectors';
import { getAuthors } from '../../store/authors/selectors';
export const Courses = () => {
  const allCourses = useSelector(getCourses);
  const authors = useSelector(getAuthors);
  const [courses, setCourses] = useState(allCourses);
  let navigation = useNavigate();
  const searchCourse = (toSearch) => {
    const foundCourses = [];
    courses.forEach((course) => {
      if (
        course.title.toLowerCase().includes(toSearch.toLowerCase()) ||
        course.id.toLowerCase().includes(toSearch.toLowerCase())
      ) {
        foundCourses.push(course);
      }
    });
    setCourses(foundCourses);
  };

  const showAllCourses = () => {
    setCourses(allCourses);
  };

  useEffect(() => {
    setCourses(allCourses);
  }, [allCourses]);
  return (
    <>
      <div className='app-courses'>
        <div className='app-courses__header'>
          <SearchBar onSearch={searchCourse} clearSearch={showAllCourses} />
          <Button
            text='Add new course'
            onClick={() => navigation('/courses/add')}
          />
        </div>
        {courses.map((course) => {
          return (
            <CourseCard
              key={course.id}
              {...course}
              authors={getAuthorName(authors, course.authors).join(', ')}
              duration={getHoursDuration(course.duration)}
              creationDate={getDateInFormat(course.creationDate)}
            />
          );
        })}
      </div>
    </>
  );
};
