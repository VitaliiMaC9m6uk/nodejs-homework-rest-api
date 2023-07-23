const Contact = require("../../models/contactModel");

exports.addContact = async (body) => {
    const newContact = await Contact.create(body);
    return newContact;
}