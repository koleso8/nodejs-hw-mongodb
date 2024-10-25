import { Router } from 'express';
import * as controllers from '../controllers/contacts.js';
import * as validation from '../validation/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import { userContacts } from '../middlewares/userContacts.js';

const contactsRouter = Router();

contactsRouter.use(authenticate);

contactsRouter.use(userContacts);

contactsRouter.get('/', ctrlWrapper(controllers.contactsController));

contactsRouter.get(
  '/:contactId',
  isValidId,
  ctrlWrapper(controllers.contactByIdController)
);

contactsRouter.post(
  '/',
  validateBody(validation.createContactScheme),
  ctrlWrapper(controllers.createContactController)
);

contactsRouter.delete(
  '/:contactId',
  isValidId,
  ctrlWrapper(controllers.deleteContactController)
);

contactsRouter.patch(
  '/:contactId',
  isValidId,
  validateBody(validation.updateContactScheme),
  ctrlWrapper(controllers.patchContactController)
);

export default contactsRouter;
