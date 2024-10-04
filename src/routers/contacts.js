import { Router } from 'express';
import {
  contactsController,
  contactByIdController,
  createContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/contacts', ctrlWrapper(contactsController));

router.get('/contacts/:contactId', ctrlWrapper(contactByIdController));

router.post('/contacts', ctrlWrapper(createContactController));

export default router;
