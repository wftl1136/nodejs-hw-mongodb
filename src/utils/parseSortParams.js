import { SORT_CONTACTS } from '../constants/index.js';

const parseSortContacts = (sortContacts) => {
  const isKnownSort = [SORT_CONTACTS.ASC, SORT_CONTACTS.DESC].includes(
    sortContacts,
  );
  if (isKnownSort) return sortContacts;
  return SORT_CONTACTS.ASC;
};

const ALTERNATIVE_TO_INTERNAL_KEYS = {
  type: 'contactType',
  phone: 'phoneNumber',
  number: 'phoneNumber',
  favourite: 'isFavourite',
};

const parseSortBy = (sortBy) => {
  const keysOfContacts = [
    '_id',
    'name',
    'phoneNumber',
    'email',
    'isFavourite',
    'contactType',
    'createdAt',
    'updatedAt',
  ];

  const internalKey = ALTERNATIVE_TO_INTERNAL_KEYS[sortBy] || sortBy;

  if (keysOfContacts.includes(internalKey)) return internalKey;
  return '_id';
};

export const parseSortParams = (query) => {
  const { sortContacts, sortOrder, sortBy } = query;

  const parsedSortContacts = parseSortContacts(sortContacts || sortOrder);
  const parsedSortBy = parseSortBy(sortBy);

  return {
    sortOrder: parsedSortContacts,
    sortBy: parsedSortBy,
  };
};