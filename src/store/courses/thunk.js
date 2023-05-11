import * as creators from './actionCreators';

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

export const saveCourse = (newCourse) => {
  return async (dispatch) => {
    dispatch(creators.fetchCourseRequest);
    try {
      const response = await fetch('http://localhost:4000/courses/add', {
        method: 'POST',
        body: JSON.stringify(newCourse),
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('userToken'),
        },
      });
      const result = await response.json();
      console.log(result);
      if (result.successful) {
        dispatch(creators.saveNewCourse(result.result));
      }
    } catch (error) {
      dispatch(creators.fetchCourseFailure(error.message));
    }
  };
};

export const updateCourse = (id, info) => {
  return async (dispatch) => {
    const response = await fetch(`http://localhost:4000/courses/${id}`, {
      method: 'PUT',
      body: JSON.stringify(info),
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('userToken'),
      },
    });
    const result = await response.json();
    if (result.successful) {
      dispatch(creators.updateCourse(result.result));
    }
  };
};

export const deleteCourse = (id) => {
  return async (dispatch) => {
    const response = await fetch(`http://localhost:4000/courses/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('userToken'),
      },
    });
    const result = await response.json();
    if (result.successful) {
      dispatch(creators.deleteCourse(id));
    }
  };
};
