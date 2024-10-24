import { Router } from 'express';
import * as controllers from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { loginUserSchema, registerUserSchema } from '../validation/auth.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(controllers.registerUserController)
);

authRouter.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(controllers.loginUserController)
);

authRouter.post('/logout', ctrlWrapper(controllers.logOutUserController));
authRouter.post('/refresh', ctrlWrapper(controllers.refreshTokenController));

export default authRouter;
