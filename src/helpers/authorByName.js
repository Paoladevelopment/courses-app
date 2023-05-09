export const getAuthorName = (authors, authorIds) => {
  const authorName = [];
  authorIds.forEach((id) => {
    authors.forEach((author) => {
      if (author.id.match(id)) {
        authorName.push(author.name);
      }
    });
  });
  return authorName;
};
