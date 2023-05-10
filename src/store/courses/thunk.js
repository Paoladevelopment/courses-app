import * as creators from './actionCreators';

const userToken = localStorage.getItem('userToken');

let token = '';
if (userToken) {
  token = JSON.parse(userToken).token;
}
export const getAllCourses = () => {
  return async (dispatch) => {
    dispatch(creators.fetchCourseRequest);
    try {
      const response = await fetch('http://localhost:4000/courses/all', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json();
      dispatch(creators.fetchCourseSuccess(result.result));
    } catch (error) {
      dispatch(creators.fetchCourseFailure(error.message));
    }
  };
};

export const saveCourses = (newCourse) => {
  return async (dispatch) => {
    dispatch(creators.fetchCourseRequest);
    try {
      const response = await fetch('http://localhost:4000/courses/add', {
        method: 'POST',
        body: JSON.stringify(newCourse),
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });
      const result = await response.json();
      if (result.successful) {
        dispatch(creators.saveNewCourse(result.result));
      }
    } catch (error) {
      dispatch(creators.fetchCourseFailure(error.message));
    }
  };
};
