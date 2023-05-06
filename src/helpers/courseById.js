import { mockedCoursesList } from '../constants';
export const getCourse = (courseId) => {
  return mockedCoursesList.find((course) => course.id === courseId);
};
