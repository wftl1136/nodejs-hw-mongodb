const buildQueryString = (query) => {
  const whiteList = [
    'perPage',
    'name',
    'phoneNumber',
    'email',
    'isFavourite',
    'contactType',
    'createdAt',
    'updateAt',
  ];
  return Object.entries(query)
    .filter(
      ([key, value]) =>
        whiteList.includes(key) && value !== undefined && value !== '',
    )
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');
};

export const renderPaginationControls = ({ page, totalPages, query = {} }) => {
  const queryParams = buildQueryString(query);
  return `
    <div style="margin-top: 30px">
${
  page > 1
    ? `<a href="/contacts?page=${
        page - 1
      }&${queryParams}" class="btn btn-sm btn-primary">← Prev </a>`
    : ''
}
<span>Page ${page} of ${totalPages}</span>
${
  page < totalPages
    ? `<a href="/contacts?page=${
        page + 1
      }&${queryParams}" class="btn btn-sm btn-primary">Next →</a>`
    : ''
}

    </div>
    `;
};