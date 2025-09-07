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
import {
  createContactsSchema,
  upDateContactsSchema,
} from '../validation/contacts.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';

const router = Router();

router.use(authenticate);

router.get('/', ctrlWrapper(getContactsController));

router.get('/new', ctrlWrapper(getNewController));

router.get(
  '/:contactId/edit',
  isValidId('contactId'),
  ctrlWrapper(getContactEditController),
);

router.get(
  '/:contactId',
  isValidId('contactId'),
  ctrlWrapper(getContactsByIdController),
);

router.post(
  '/',
  validateBody(createContactsSchema),
  upload.single('photo'),
  ctrlWrapper(createContactController),
);

router.delete(
  '/:contactId',
  isValidId('contactId'),
  ctrlWrapper(deleteContactController),
);

router.put(
  '/:contactId',
  isValidId('contactId'),
  upload.single('photo'),
  validateBody(createContactsSchema),
  ctrlWrapper(upsertContactController),
);

router.patch(
  '/:contactId',
  isValidId('contactId'),
  upload.single('photo'),
  validateBody(upDateContactsSchema),
  ctrlWrapper(pathContactController),
);

export default router;