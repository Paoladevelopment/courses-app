import * as actions from './actionTypes';
const authorsInitialState = [];
export const reducerAuthors = (state = authorsInitialState, action) => {
  switch (action.type) {
    case actions.SAVE_AUTHOR:
      return [...state, action.payload.author];

    case actions.GET_AUTHORS:
      return action.payload.authors;
    case actions.DELETE_AUTHOR: {
      return state.filter((author) => author.id !== action.payload.id);
    }
    case actions.DELETE_AUTHORS: {
      return [];
    }
    default:
      return state;
  }
};
