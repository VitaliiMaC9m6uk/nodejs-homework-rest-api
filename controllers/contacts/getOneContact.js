const Contact = require("../../models/contactModel");

exports.getOneContact = async (id) => {
    const contact = await Contact.findById(id);
    return contact
}