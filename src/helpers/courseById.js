export const getCourse = (courses, courseId) => {
  return courses.find((course) => course.id === courseId);
};
