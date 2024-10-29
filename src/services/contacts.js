import { SORT_ORDER } from '../constants/index.js';
import { ContactsCollection } from '../db/models/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
  userId,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = ContactsCollection.find();

  if (filter.type) {
    contactsQuery.where('contactType').equals(filter.type);
  }

  if (filter.isFavourite) {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }

  if (userId) {
    contactsQuery.where('userId').equals(userId);
  }

  const contactsCount = await ContactsCollection.find()
    .merge(contactsQuery)
    .countDocuments();

  const contacts = await contactsQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = async contactId => {
  const contact = await ContactsCollection.findById(contactId);
  return contact;
};

export const createContact = async (payload, userId, photoUrl) => {
  const contact = await ContactsCollection.create({
    ...payload,
    userId,
    photo: photoUrl,
  });
  return contact;
};

export const deleteContact = async contactId => {
  const contact = await ContactsCollection.findOneAndDelete({
    _id: contactId,
  });
  return contact;
};

export const patchContact = async (contactId, payload) => {
  const result = await ContactsCollection.findOneAndUpdate(
    {
      _id: contactId,
    },
    payload,
    {
      new: true,
    }
  );

  if (!result) return null;

  return {
    contact: result,
  };
};
