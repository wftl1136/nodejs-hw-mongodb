import { isValidObjectId } from 'mongoose';

const parseName = (value) => {
  const isString = typeof value === 'string';
  if (isString) return value.trim();
  return undefined;
};

const parseNumber = (value) => {
  const isString = typeof value === 'string';
  if (!isString) return undefined;
  const parsedNumber = parseInt(value);
  if (Number.isNaN(parsedNumber)) {
    return undefined;
  }
  return parsedNumber;
};

const parseBoolean = (value) => {
  if (value === 'true' || value === true) return true;
  if (value === 'false' || value === false) return false;
  return undefined;
};

const parseType = (type) => {
  const validTypes = ['work', 'home', 'personal'];
  if (!type) return undefined;
  let typesArray = [];

  if (Array.isArray(type)) {
    typesArray = type;
  } else if (typeof type === 'string') {
    typesArray = [type];
  } else {
    return undefined;
  }

  const filtered = typesArray.filter((type) => validTypes.includes(type));
  return filtered.length > 0 ? filtered : undefined;
};

export const parseFilterParams = (query) => {
  const isReset = query.action === 'reset';
  if (isReset) return {};
  const filter = {
    name: parseName(query.name),
    phoneNumber: parseName(query.phoneNumber),
    email: parseName(query.email),
    isFavourite: parseBoolean(query.isFavourite),
    type: parseType(query.type),
    createdFrom: query.createdFrom || undefined,
    createdTo: query.createdTo || undefined,
    updatedFrom: query.updatedFrom || undefined,
    updatedTo: query.updatedTo || undefined,
    contactId: isValidObjectId(query.contactId) ? query.contactId : undefined,
  };

  return Object.fromEntries(
    Object.entries(filter).filter(
      ([_, value]) => value !== undefined && value !== '',
    ),
  );
};