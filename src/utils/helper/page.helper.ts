export const receivePageCountInformation = (
  page: number,
  pageCount: number,
  totalCount: number,
  limit: number = 20
) => {
  let from: number = (page - 1) * pageCount + 1;
  let to: number = page * pageCount;

  if (from > totalCount) {
    from = totalCount;
  }

  if (to > totalCount) {
    to = totalCount;
  }

  if (from > totalCount) {
    from = to = 0;
  }
  if (totalCount === pageCount || totalCount <= limit) {
    to = from;
  }

  return { from, to };
};
