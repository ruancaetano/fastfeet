export default (page, pageSize) => {
  if (!page || !pageSize) return {};

  const parsedPage = parseInt(page, 10);
  const parsedPageSize = parseInt(pageSize, 10);
  const formattedPage = parsedPage > 1 ? parsedPage - 1 : 0;

  return {
    offset: formattedPage * parsedPageSize,
    limit: parsedPageSize,
  };
};
