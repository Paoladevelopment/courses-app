import * as actions from './actionTypes';

const coursesInitialState = [];

export const reducerCourses = (state = coursesInitialState, action) => {
  switch (action.type) {
    case actions.SAVE_COURSE:
      return [...state, action.payload.course];

    case actions.DELETE_COURSE:
      return state.filter((course) => course.id !== action.payload.id);

    case actions.UPDATE_COURSE:
      return state.map((course) =>
        course.id === action.payload.courseUpdated.id
          ? action.payload.courseUpdated
          : course
      );
    case actions.GET_COURSES:
      return action.payload.courses;
    default:
      return state;
  }
};
