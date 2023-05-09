import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { reducerUser } from './user/reducer';
import { reducerCourses } from './courses/reducer';
import { reducerAuthors } from './authors/reducer';
const rootReducer = combineReducers({
  user: reducerUser,
  courses: reducerCourses,
  authors: reducerAuthors,
});

export const store = configureStore({
  reducer: rootReducer,
});
