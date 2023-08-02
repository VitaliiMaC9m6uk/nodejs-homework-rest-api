const { AppError, contactValidators, catchAsync } = require("../utils");
const Contact = require("../models/contactModel");
const contactServices = require("../services/contactServices");

exports.checkContactId = catchAsync(async (req, res, next) => {
  await contactServices.contactExistsById(req.params.contactId);

  next();
});

exports.checkCreateContactData = catchAsync(async (req, res, next) => {
  const { error, value } = contactValidators.createContactDataValidator(
    req.body
  );

  if (error) {
    console.log(error);

    throw new AppError(400, "Invalid contact data..");
  }

  const contactExists = await Contact.exists({
    $or: [
      { name: value.name, owner: req.user._id },
      { email: value.email, owner: req.user._id },
    ],
  });

  if (contactExists) throw new AppError(409, "Contact with this name exists..");

  req.body = value;

  next();
});
