const Contact = require("../../models/contactModel");

exports.listContacts = async (id) => {
  const contacts = await Contact.find({ owner: id });
  return contacts;
};
