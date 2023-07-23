const Contact = require("../../models/contactModel");

exports.changeStatusContact = async (id, body) => {
  const updateContact = await Contact.findByIdAndUpdate(
    id,
    {
      favorite: body.favorite,
    },
    { new: true }
  );
  return updateContact;
};
