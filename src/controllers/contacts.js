import createHttpError from 'http-errors';
import {
  createContact,
  deleteContact,
  getAllContacts,
  getContactsById,
  updateContact,
} from '../services/contacts.js';
import { renderContact } from '../render/Contact/renderContact.js';
import { renderContactsList } from '../render/ContactsList/renderContactsList.js';
import { renderForm } from '../render/Form/renderForm.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { config } from '../config.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortOrder, sortBy } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  const contacts = await getAllContacts({
    page,
    perPage,
    sortOrder,
    sortBy,
    filter,
    userId: req.user._id,
  });
  const accept = req.headers.accept || '';
  if (accept.includes('text/html')) {
    const msg = req.query.msg || '';
    res.send(
      renderContactsList(contacts.data, msg, {
        page: contacts.page,
        totalItems: contacts.totalItems,
        totalPages: contacts.totalPages,
        hasNextPage: contacts.hasNextPage,
        hasPreviousPage: contacts.hasPreviousPage,
        perPage: contacts.perPage,
        query: req.query,
      }),
    );
  } else {
    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  }
};

export const getContactsByIdController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactsById({ contactId, userId: req.user._id });
  const accept = req.headers.accept || '';
  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }
  if (accept.includes('text/html')) {
    res.send(renderContact(contact));
  } else {
    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  }
};

export const getNewController = async (req, res) => {
  res.send(renderForm({}, false));
};

export const getContactEditController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactsById({ contactId, userId: req.user._id });
  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }
  res.send(renderForm(contact, true));
};

export const createContactController = async (req, res, next) => {
  const photo = req.file;

  let photoUrl;

  if (photo) {
    if (config.cloudinary.enable === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  const result = await createContact({
    ...req.body,
    photo: photoUrl,
    userId: req.user._id,
  });

  if (!result) {
    next(createHttpError(404, 'Student not found'));
    return;
  }

  const accept = req.headers.accept || '';
  if (accept.includes('text/html')) {
    return res.redirect(
      `/contacts?msg=Successfully+created+a+contac+with+id+${result.contact.id}!`,
    );
  }
  res.status(201).json({
    status: 201,
    message: `Successfully created a contact!`,
    data: result.contact,
  });
};

export const deleteContactController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await deleteContact({ contactId, userId: req.user._id });
  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }
  const accept = req.headers.accept || '';

  if (accept.includes('text/html')) {
    return res.redirect('/contacts?msg=Contact+deleted');
  }

  res.status(204).send();
};

export const upsertContactController = async (req, res) => {
  const { contactId } = req.params;

  const photo = req.file;

  let photoUrl;

  if (photo) {
    if (config.cloudinary.enable === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  const result = await updateContact({
    contactId,
    userId: req.user._id,
    payload: { ...req.body, photo: photoUrl },
    options: { upsert: true },
  });
  if (!result) {
    throw createHttpError(404, 'Contact not found');
  }
  const status = result.isNew ? 201 : 200;
  const accept = req.headers.accept || '';
  if (accept.includes('text/html')) {
    status === 201
      ? res.redirect(
          `/contacts?msg=Successfully+created+new+contact+with+id+${contactId}!`,
        )
      : res.redirect(
          `/contacts?msg=Successfully+updated+a+contact+with+id+${contactId}!`,
        );
    return;
  }
  res.status(status).json({
    status: status,
    message: 'Successfully update a contact!',
    data: result.contact,
  });
};

export const pathContactController = async (req, res) => {
  const { contactId } = req.params;

  const photo = req.file;

  let photoUrl;

  if (photo) {
    if (config.cloudinary.enable === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  if ((!req.body || Object.keys(req.body).length === 0) && !photo) {
    throw createHttpError(400, 'No fields provided to update');
  }

  const result = await updateContact({
    contactId,
    userId: req.user._id,
    payload: { ...req.body, photo: photoUrl },
  });
  if (!result) {
    throw createHttpError(404, 'Contact not found');
  }
  const accept = req.headers.accept || '';
  if (accept.includes('text/html')) {
    return res.send(`Successfully patched a contact with id ${contactId}!`);
  }
  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result.contact,
  });
};