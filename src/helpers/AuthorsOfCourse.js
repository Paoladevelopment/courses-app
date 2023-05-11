export const getAuthorsCourse = (authors, authorIds) => {
  const authorsCourse = [];
  authorIds.forEach((id) => {
    authors.forEach((author) => {
      if (author.id.match(id)) {
        authorsCourse.push(author);
      }
    });
  });
  return authorsCourse;
};
