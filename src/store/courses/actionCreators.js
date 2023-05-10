import * as actions from './actionTypes';

export const fetchCourseRequest = () => {
  return {
    type: actions.FETCH_COURSE_REQUEST,
  };
};

export const fetchCourseSuccess = (courses) => {
  return {
    type: actions.FETCH_COURSE_SUCCESS,
    payload: {
      courses,
    },
  };
};

export const fetchCourseFailure = (error) => {
  return {
    type: actions.FETCH_COURSE_FAILURE,
    payload: {
      error,
    },
  };
};

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
