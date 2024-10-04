import createHttpError from 'http-errors';
import { getAllContacts, getContactById } from '../services/contacts.js';

export const contactsController = async (req, res) => {
  const contacts = await getAllContacts();
  res
    .status(200)
    .json({ message: 'Successfully found contacts!', data: contacts });
};

export const contactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }
  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};
