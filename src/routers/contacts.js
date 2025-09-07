import { Router } from 'express';
import {
  getContactsController,
  getContactsByIdController,
  createContactController,
  deleteContactController,
  upsertContactController,
  pathContactController,
  getNewController,
  getContactEditController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createContactsSchema, upDateContactsSchema } from '../validation/contacts.js';

const router = Router();

router.get('/contacts', ctrlWrapper(getContactsController));

router.get('/contacts/new', ctrlWrapper(getNewController));

router.get('/contacts/:contactId/edit', isValidId('contactId'), ctrlWrapper(getContactEditController));

router.get('/contacts/:contactId', isValidId('contactId'), ctrlWrapper(getContactsByIdController));

router.post('/contacts', validateBody(createContactsSchema), ctrlWrapper(createContactController));

router.delete('/contacts/:contactId', isValidId('contactId'), ctrlWrapper(deleteContactController));

router.put('/contacts/:contactId', isValidId('contactId'), validateBody(createContactsSchema), ctrlWrapper(upsertContactController));

router.patch('/contacts/:contactId', isValidId('contactId'), validateBody(upDateContactsSchema), ctrlWrapper(pathContactController));

export default router;