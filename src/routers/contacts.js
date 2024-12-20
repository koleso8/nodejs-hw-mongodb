import { Router } from 'express';
import * as controllers from '../controllers/contacts.js';
import * as validation from '../validation/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';

const contactsRouter = Router();

contactsRouter.use(authenticate);

contactsRouter.get('/', ctrlWrapper(controllers.contactsController));

contactsRouter.get(
  '/:contactId',
  isValidId,
  ctrlWrapper(controllers.contactByIdController)
);

contactsRouter.post(
  '/',
  upload.single('photo'),
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
  upload.single('photo'),
  isValidId,
  validateBody(validation.updateContactScheme),
  ctrlWrapper(controllers.patchContactController)
);

export default contactsRouter;
