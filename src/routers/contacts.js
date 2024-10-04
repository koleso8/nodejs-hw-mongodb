import { Router } from 'express';
import {
  contactsController,
  contactByIdController,
} from '../controllers/contactsControllers.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/contacts', ctrlWrapper(contactsController));

router.get('/contacts/:contactId', ctrlWrapper(contactByIdController));

export default router;
