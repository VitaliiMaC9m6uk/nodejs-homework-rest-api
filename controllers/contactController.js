const Contact = require("../models/contactModel");

const { AppError, catchAsync } = require("../utils");
const {
  addContact,
  getAllContacts,
  getOneContact,
  removeContact,
  changeStatusContact,
} = require("./contacts");
const contactServices = require("../services/contactServices");

exports.getContacts = catchAsync(async (req, res, next) => {
  const contacts = await getAllContacts.listContacts();

  res.status(200).json({
    message: "Success",
    contacts,
  });
});

exports.getOneContact = catchAsync(async (req, res, next) => {
  const id = req.params.contactId;
  const contact = await getOneContact.getOneContact(id);

  res.status(200).json({
    message: "Success",
    contact,
  });
});

exports.createContact = catchAsync(async (req, res, next) => {
  const newContact = await addContact.addContact(req.body);

  res.status(201).json(newContact);
});

exports.deleteContact = catchAsync(async (req, res, next) => {
  const id = req.params.contactId;
  await removeContact.removeContact(id);

  res.sendStatus(204);
});

exports.changeContact = catchAsync(async (req, res, next) => {
  const body = req.body;
  const id = req.params.contactId;

  if (body === null) {
    throw new AppError(400, "Missing fields");
  }

  const updateContact = await contactServices.updateContact(id, body);

  res.status(200).json(updateContact);
});

exports.updateStatusContact = catchAsync(async (req, res, next) => {
  const body = req.body;
  const id = req.params.contactId;

  if (body.favorite === null) {
    throw new AppError(400, "Missing fields favorite");
  }
  
  const updateContact = await changeStatusContact.changeStatusContact(id, body);

  res.status(200).json(updateContact);
});
