const { AppError, contactValidators } = require("../utils");
const Contact = require("../models/contactModel");
const contactServices = require("../services/contactServices");

exports.checkContactId = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    
    await contactServices.contactExistsById(contactId);

    next();
  } catch (error) {
    next(error);
  }
};

exports.checkCreateContactData = async (req, res, next) => {
  try {
    const { error, value } = contactValidators.updateContactDataValidator(
      req.body
    );

    if (error) {
      console.log(error);

      throw new AppError(400, "Invalid contact data..");
    }

    const contactExists = await Contact.exists({
      $or: [
        {
          name: value.name,
          email: value.email,
        },
      ],
    });

    if (contactExists)
      throw new AppError(409, "Contact with this name exists..");

    req.body = value;

    next();
  } catch (error) {
    next(error);
  }
};
