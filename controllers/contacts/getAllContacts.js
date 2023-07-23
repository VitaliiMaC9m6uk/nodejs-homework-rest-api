const Contact = require("../../models/contactModel");

exports.listContacts = async () => {
    const contacts = await Contact.find();
    return contacts;
}