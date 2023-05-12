import * as actions from './actionTypes';
const authorsInitialState = {
  loading: false,
  authors: [],
  error: '',
};

export const reducerAuthors = (state = authorsInitialState, action) => {
  switch (action.type) {
    case actions.FETCH_AUTHORS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actions.FETCH_AUTHORS_SUCCESS:
      return {
        loading: false,
        authors: action.payload.authors,
        error: '',
      };

    case actions.FETCH_AUTHORS_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };
    case actions.SAVE_AUTHOR:
      return {
        ...state,
        authors: [...state.authors, action.payload.author],
      };

    default:
      return state;
  }
};
