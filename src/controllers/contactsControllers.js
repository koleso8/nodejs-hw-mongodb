import { getAllContacts, getContactById } from '../services/contacts.js';

export const contactsController = async (req, res) => {
  const contacts = await getAllContacts();
  res
    .status(200)
    .json({ message: 'Successfully found contacts!', data: contacts });
};

export const contactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  if (!contact) {
    res.status(404).json({ message: 'Contact not found' });
    return;
  }
  res.status(200).json({
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};
