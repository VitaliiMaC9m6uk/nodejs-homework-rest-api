const Contact = require("../../models/contactModel");

exports.addContact = async (body, owner) => {
  const newContact = await Contact.create({ ...body, owner });
  return newContact;
};
