import * as actions from './actionTypes';

export const addAuthor = (author) => {
  return {
    type: actions.SAVE_AUTHOR,
    payload: {
      author,
    },
  };
};

export const getAuthors = (authors) => {
  return {
    type: actions.GET_AUTHORS,
    payload: {
      authors,
    },
  };
};

export const deleteAuthor = (id) => {
  return {
    type: actions.DELETE_AUTHOR,
    payload: {
      id,
    },
  };
};

export const deleteAllAuthors = () => {
  return {
    type: actions.DELETE_AUTHORS,
  };
};
