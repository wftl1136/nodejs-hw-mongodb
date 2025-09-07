export const dateRangeFilter = (
  query,
  contactsQuery,
  fieldName,
  dateFrom,
  dateTo,
) => {
  const range = {};

  const fromDate = query[dateFrom] ? new Date(query[dateFrom]) : null;
  if (fromDate && !isNaN(fromDate.getTime())) {
    range.$gte = fromDate;
  }

  const toDate = query[dateTo] ? new Date(query[dateTo]) : null;
  if (toDate && !isNaN(toDate.getTime())) {
    range.$lte = toDate;
  }

  if (Object.keys(range).length > 0) {
    contactsQuery.where(fieldName, range);
  }
  console.log({ range });
  return contactsQuery;
};