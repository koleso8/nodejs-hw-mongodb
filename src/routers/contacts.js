import { Router } from 'express';
import * as controllers from '../controllers/contacts.js';
import * as validation from '../validation/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';

const router = Router();

router.get('/contacts', ctrlWrapper(controllers.contactsController));

router.get(
  '/contacts/:contactId',
  isValidId,
  ctrlWrapper(controllers.contactByIdController)
);

router.post(
  '/contacts',
  validateBody(validation.createContactScheme),
  ctrlWrapper(controllers.createContactController)
);

router.delete(
  '/contacts/:contactId',
  isValidId,
  ctrlWrapper(controllers.deleteContactController)
);

router.patch(
  '/contacts/:contactId',
  isValidId,
  validateBody(validation.updateContactScheme),
  ctrlWrapper(controllers.patchContactController)
);

export default router;
