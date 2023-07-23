const Contact = require("../models/contactModel");

const { AppError, catchAsync } = require("../utils");
const contactServices = require("../services/contactServices");

exports.getContacts = catchAsync(async (req, res, next) => {
  const contacts = await Contact.find();

  res.status(200).json({
    message: "Success",
    contacts,
  });
});

exports.getOneContact = catchAsync(async (req, res, next) => {
  const contacts = await Contact.findById(req.params.contactId);

  res.status(200).json({
    message: "Success",
    contacts,
  });
});

exports.createContact = catchAsync(async (req, res, next) => {
  const newContact = await Contact.create(req.body);

  res.status(201).json(newContact);
});

exports.deleteContact = catchAsync(async (req, res, next) => {
 
  await Contact.findByIdAndDelete(req.params.contactId);

  res.sendStatus(204);
});

exports.changeContact = catchAsync(async (req, res, next) => {
  const body = req.body;

  if (body === null) {
    throw new AppError(400, "Missing fields");
  }

  const updateContact = await contactServices.updateContact(
    req.params.contactId,
    body
  );

  res.status(200).json(updateContact);
});

exports.updateStatusContact = catchAsync(async (req, res, next) => {  
    const body = req.body;
    const id = req.params.contactId;

    if (body.favorite === null) {
      throw new AppError(400, "Missing fields favorite");
    }

    const updateContact = await Contact.findByIdAndUpdate(
      id,
      {
        favorite: body.favorite,
      },
      { new: true }
    );

    res.status(200).json(updateContact);  
});
