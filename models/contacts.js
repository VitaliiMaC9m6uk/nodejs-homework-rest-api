const fs = require("fs/promises");
const path = require("path");
const uuid = require("uuid").v4;

const contactsPath = path.join("models", "contacts.json");

const listContacts = async () => {
  const contactsResult = await fs.readFile(contactsPath);
  const contacts = JSON.parse(contactsResult);

  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contactById = contacts.find(
    (contact) => String(contact.id) === String(contactId)
  );

  return contactById || null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const updateContacts = contacts.filter(
    (contact) => contact.id !== contactId
  );

  await fs.writeFile(contactsPath, JSON.stringify(updateContacts));

  return contacts.find((contact) => String(contact.id) === String(contactId));
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();

  const body = {
    id: uuid(),
    name,
    email,
    phone,
  };    
  contacts.push(body);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));

  return body;
};

const updateContact = async (contactId, body) => {
 
  const { name, email, phone } = body;

  const contacts = await listContacts();
  
  const [contactToUpdate] = contacts.filter((item) => item.id === contactId);

  contactToUpdate.name = name;
  contactToUpdate.email = email;
  contactToUpdate.phone = phone;

  const newContacts = [...contacts];

  await fs.writeFile(contactsPath, JSON.stringify(newContacts));

  return contactToUpdate; 
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
