import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { env } from './src/utils/env.js';
import { contactId, contacts } from './src/routers/routers.js';
import {
  contactByIdController,
  contactsController,
} from './src/controllers/contactsControllers.js';

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

  app.get(contacts, contactsController);

  app.get(contactId, contactByIdController);

  app.use('*', (req, res, next) => {
    res.status(404).json({
      message: `url '${req.baseUrl}' not found`,
    });
    next();
  });

  app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  });
};
