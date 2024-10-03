import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { env } from './src/utils/env.js';
import { getAllContacts, getContactById } from './src/services/contacts.js';
import mongoose from 'mongoose';

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

  app.get('/contacts', async (req, res) => {
    const contacts = await getAllContacts();
    res.status(200).json({ data: contacts });
  });

  app.get('/contacts/:contactId', async (req, res) => {
    // const { contactId } = req.params;
    // const contact = await getContactById(contactId);
    // console.log(contact);

    // if (!contact) {
    //   res.status(404).json({ message: 'Contact not found' });
    //   return;
    // }
    // res.status(200).json({
    //   data: contact,
    // });

    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ObjectId' });
    }
    try {
      const contact = await getContactById(id);
      res.status(200).json({
        data: contact,
      });
    } catch (error) {
      res.status(404).json({ message: `Contact not found ${error}` });
      return;
    }
  });

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
