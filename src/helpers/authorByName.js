import { mockedAuthorsList } from '../constants';
export const getAuthorName = (authorIds) => {
  const authorName = [];
  authorIds.forEach((id) => {
    mockedAuthorsList.forEach((author) => {
      if (author.id.match(id)) {
        authorName.push(author.name);
      }
    });
  });
  return authorName;
};
