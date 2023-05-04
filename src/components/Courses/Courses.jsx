import { useState } from 'react';
import { CourseCard } from './components/CourseCard/CourseCard';
import { SearchBar } from './components/SearchBar/SearchBar';
import { Button } from '../../common/Button/Button';
import { CreateCourse } from '../CreateCourse/CreateCourse';
import { mockedCoursesList } from '../../constants';
import { getAuthorName } from '../../helpers/authorByName';
import { getHoursDuration } from '../../helpers/pipeDuration';
import { getDateInFormat } from '../../helpers/dateGeneratop';
import './courses.css';
export const Courses = () => {
  const [courses, setCourses] = useState(mockedCoursesList);
  const [showAddNewCourse, setShowAddNewCourse] = useState(false);
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
    setCourses(mockedCoursesList);
  };
  return (
    <>
      {showAddNewCourse ? (
        <CreateCourse />
      ) : (
        <div className='app-courses'>
          <div className='app-courses__header'>
            <SearchBar onSearch={searchCourse} clearSearch={showAllCourses} />
            <Button
              text='Add new course'
              onClick={() => setShowAddNewCourse(true)}
            />
          </div>
          {courses.map((course) => {
            return (
              <CourseCard
                key={course.id}
                {...course}
                authors={getAuthorName(course.authors).join(', ')}
                duration={getHoursDuration(course.duration)}
                creationDate={getDateInFormat(course.creationDate)}
              />
            );
          })}
        </div>
      )}
    </>
  );
};
