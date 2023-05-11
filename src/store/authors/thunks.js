import * as creators from './actionCreators';

export const getAllAuthors = () => {
  return async (dispatch) => {
    dispatch(creators.fetchAuthorsRequest);
    try {
      const response = await fetch('http://localhost:4000/authors/all', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json();
      dispatch(creators.fetchAuthorSuccess(result.result));
    } catch (error) {
      dispatch(creators.fetchAuthorFailure(error.message));
    }
  };
};

export const addAuthor = (author) => {
  return async (dispatch) => {
    dispatch(creators.fetchAuthorsRequest);
    try {
      const response = await fetch('http://localhost:4000/authors/add', {
        method: 'POST',
        body: JSON.stringify(author),
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('userToken'),
        },
      });
      const result = await response.json();
      dispatch(creators.addAuthor(result.result));
    } catch (error) {
      dispatch(creators.fetchAuthorFailure(error.message));
    }
  };
};
