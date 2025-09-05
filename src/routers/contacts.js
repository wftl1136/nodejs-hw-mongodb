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
import { validateRoute } from '../validators/validateRoute.js';

const router = Router();

router.param('contactId', validateRoute);

router.get('/contacts', ctrlWrapper(getContactsController));

router.get('/contacts/new', ctrlWrapper(getNewController));

router.get('/contacts/:contactId/edit', ctrlWrapper(getContactEditController));

router.get('/contacts/:contactId', ctrlWrapper(getContactsByIdController));

router.post('/contacts', ctrlWrapper(createContactController));

router.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));

router.put('/contacts/:contactId', ctrlWrapper(upsertContactController));

router.patch('/contacts/:contactId', ctrlWrapper(pathContactController));

export default router;