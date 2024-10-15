import createHttpError from 'http-errors';
import * as services from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';

export const contactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);

  const contacts = await services.getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
  });
  res.status(200).json({
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const contactByIdController = async (req, res) => {
  const { contactId } = req.params;

  const contact = await services.getContactById(contactId);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }
  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const createContactController = async (req, res) => {
  const contact = await services.createContact(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;

  const contact = await services.deleteContact(contactId);
  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }
  res.status(204).send();
};

export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;

  const result = await services.patchContact(contactId, req.body);

  if (!result) {
    next(createHttpError(404, 'Student not found !'));
    return;
  }

  res.status(200).json({
    status: 200,
    message: `Successfully patched a contact ${result.contact.name}!`,
    data: result.contact,
  });
};
