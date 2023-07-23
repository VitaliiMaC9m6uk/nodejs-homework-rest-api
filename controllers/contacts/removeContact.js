const Contact = require("../../models/contactModel");

exports.removeContact = async (id) => {
    await Contact.findByIdAndDelete(id);
    return;
}