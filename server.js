import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { env } from './src/utils/env.js';
import contactsRouter from './src/routers/contacts.js';
import { errorHandler } from './src/middlewares/errorHandler.js';
import { notFoundHandler } from './src/middlewares/notFoundHandler.js';

const PORT = Number(env('PORT', '3000'));

export const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    })
  );

  app.get('/', (req, res) => {
    res.json({
      message: 'Hello world ^_^',
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  app.use(contactsRouter);

  app.use('*', notFoundHandler);

  app.use(errorHandler);
};
