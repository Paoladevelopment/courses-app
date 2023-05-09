import * as actions from './actionTypes';

export const saveNewCourse = (course) => {
  return {
    type: actions.SAVE_COURSE,
    payload: {
      course,
    },
  };
};

export const deleteCourse = (id) => {
  return {
    type: actions.DELETE_COURSE,
    payload: {
      id,
    },
  };
};

export const updateCourse = (courseUpdated) => {
  return {
    type: actions.UPDATE_COURSE,
    payload: {
      courseUpdated,
    },
  };
};

export const getCourses = (courses) => {
  return {
    type: actions.GET_COURSES,
    payload: {
      courses,
    },
  };
};
