import * as actions from './actionTypes';

const initialState = {
  loading: false,
  courses: [],
  error: '',
};

export const reducerCourses = (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_COURSE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actions.FETCH_COURSE_SUCCESS:
      return {
        loading: false,
        courses: action.payload.courses,
        error: '',
      };

    case actions.FETCH_COURSE_FAILURE:
      return {
        loading: false,
        users: [],
        error: action.payload.error,
      };
    case actions.SAVE_COURSE:
      return {
        ...state,
        courses: [...state.courses, action.payload.course],
      };

    case actions.UPDATE_COURSE:
      return {
        ...state,
        courses: state.courses.map((course) => {
          return course.id === action.payload.courseUpdated.id
            ? action.payload.courseUpdated
            : course;
        }),
      };

    case actions.DELETE_COURSE:
      return {
        ...state,
        courses: state.courses.filter(
          (course) => course.id !== action.payload.id
        ),
      };

    default:
      return state;
  }
};
