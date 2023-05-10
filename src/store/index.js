import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { reducerUser } from './user/reducer';
import { reducerCourses } from './courses/reducer';
import { reducerAuthors } from './authors/reducer';
const rootReducer = combineReducers({
  user: reducerUser,
  courses: reducerCourses,
  authors: reducerAuthors,
});

const middleware = [thunk, logger];
export const store = configureStore({
  reducer: rootReducer,
  middleware: middleware,
});
