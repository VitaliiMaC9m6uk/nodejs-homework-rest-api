const { Types } = require("mongoose");
const { AppError, contactValidators } = require("../utils");
const Contact = require("../models/contactModel");

exports.checkContactId = async (req, res, next) => {
    try {
        const { contactId } = req.params;

        const idIsValid = Types.ObjectId.isValid(contactId);

        if (!idIsValid) throw new AppError(404, "valid");

        const contactExists = await Contact.exists({ _id: contactId });

        if (!contactExists) throw new AppError(404, "Contact does not exist");
        
        next();
    }
    catch (error) {
        next(error)
    }
};

exports.checkCreateContactData = async (req, res, next) => {
    try {
       const { error, value } = contactValidators.createContactDataValidator(
         req.body
       );

       if (error) {
         console.log(error);

         throw new AppError(400, "Invalid contact data..");
        }
       
        const contactExists = await Contact.exists({ name: value.name });
        req.body = value;

        next();
    }
    catch (error) {
        next(error)
    }
}
