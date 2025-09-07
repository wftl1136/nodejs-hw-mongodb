import mongoose from 'mongoose';
import { SORT_CONTACTS } from '../constants/index.js';
import { ContactsCollection } from '../db/models/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { dateRangeFilter } from '../utils/dateRangeFilter.js';
import { escapeRegExp } from '../utils/escapeRegExp.js';

export const getAllContacts = async ({
  page,
  perPage,
  sortOrder = SORT_CONTACTS.ASC,
  sortBy = '_id',
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  let contactsQuery = ContactsCollection.find();

  if (filter.name) {
    contactsQuery.where('name').regex(new RegExp(filter.name, 'i'));
  }
  if (filter.phoneNumber) {
    contactsQuery
      .where('phoneNumber')
      .regex(new RegExp(escapeRegExp(filter.phoneNumber)));
  }
  if (filter.email !== undefined) {
    if (filter.email === 'empty' || filter.email === 'n/a') {
      contactsQuery.where('email').in(['', null]);
    } else if (filter.email === '*') {
      contactsQuery.where('email').nin(['', null]);
    } else if (filter.email === '') {
    } else {
      contactsQuery.where('email').regex(new RegExp(filter.email, 'i'));
    }
  }
  if (filter.isFavourite !== undefined) {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }
  if (filter.type) {
    const types = Array.isArray(filter.type) ? filter.type : [filter.type];
    contactsQuery.where('contactType').in(types);
  }

  contactsQuery = dateRangeFilter(
    filter,
    contactsQuery,
    'createdAt',
    'createdFrom',
    'createdTo',
  );

  contactsQuery = dateRangeFilter(
    filter,
    contactsQuery,
    'updatedAt',
    'updatedFrom',
    'updatedTo',
  );

  if (filter.contactId) {
    if (mongoose.Types.ObjectId.isValid(filter.contactId)) {
      contactsQuery.where('_id').equals(filter.contactId);
    } else {
      console.log('error');
    }
  }

  const contactCount = await ContactsCollection.find()
    .merge(contactsQuery)
    .countDocuments();

  const contacts = await contactsQuery
    .skip(skip)
    .limit(limit)
    .collation({ locale: 'en', strength: 2 })
    .sort({ [sortBy]: sortOrder })
    .exec();
  const paginationData = calculatePaginationData(contactCount, page, perPage);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactsById = async (contactId) => {
  const contact = await ContactsCollection.findById(contactId);
  return contact;
};

export const createContact = async (payload) => {
  const contact = await ContactsCollection.create(payload);
  return contact;
};

export const deleteContact = async (contactId) => {
  const contact = await ContactsCollection.findOneAndDelete({ _id: contactId });
  return contact;
};

export const updateContact = async (contactId, payload, options = {}) => {
  const rawResult = await ContactsCollection.findOneAndUpdate(
    { _id: contactId },
    payload,
    { new: true, includeResultMetadata: true, ...options },
  );
  if (!rawResult || !rawResult.value) return null;
  return {
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};