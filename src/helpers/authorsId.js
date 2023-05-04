export const getAuthorsId = (authors) => {
  let ids = [];
  authors.forEach((au) => {
    ids.push(au.id);
  });
  return ids;
};
