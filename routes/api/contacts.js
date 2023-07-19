const express = require('express');
const { listContacts, addContact, getContactById, removeContact, updateContact } = require("../../models/contacts");
const { AppError, contactValidators } = require('../../utils');


const router = express.Router()


router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const contactId = req.params.contactId;    
    const contactById = await getContactById(contactId);

    if (!contactById) {
      throw new AppError(404, "Not found");      
    }

    res.json(contactById);
  } catch (error) {
    next(error)
  }
})

router.post("/", async (req, res, next) => {
  try {   
    const { error, value } = contactValidators.createContactDataValidator(req.body);

    if (error) throw new AppError(400, "Invalid user data..");

    const data = value;    
    
    const newContact = await addContact(data);

    res.status(201).json(newContact);
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const findContactById = await removeContact(contactId);
    
    if (!findContactById) {
      throw new AppError(404, "Not found")
    }
    res.status(200).json({
      message: "Contact deleted "      
    })
   } catch (error) {
    next(error)
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const body = req.body;

    if (body === null) {
      throw new AppError(400, "Missing fields");
    }

    const { error, value } = contactValidators.createContactDataValidator(
      body
    );

    if (error) throw new AppError(400, "Invalid user data..");

    const data = value;
    const contactUpdate = await updateContact(contactId, data);

    if (!contactUpdate) {
      throw new AppError(404, "Not found");
    }
    res.status(200).json(contactUpdate);
  } catch (error) {
    next(error)
  }
})

module.exports = router
