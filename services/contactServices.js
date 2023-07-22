const { Types } = require("mongoose");
const Contact = require("../models/contactModel");
const { AppError } = require("../utils");

exports.contactExistsById = async (id) => {
  const idIsValid = Types.ObjectId.isValid(id);
  
  if (!idIsValid) throw new AppError(404, "Contact does not exist");

  const contactExists = await Contact.exists({ _id: id });

  if (!contactExists) throw new AppError(404, "Contact does not exist");
};

exports.updateContact = async (id, contactData) => {
    const contact = await Contact.findById(id);

    Object.keys(contactData).forEach(key => {
        contact[key] = contactData[key];
    });

    return contact.save();
};
