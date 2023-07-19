const express = require('express');

const {
  getContacts,
  getOneContact,
  createContact,
  deleteContact,
  changeContact,
} = require("../../controllers/contactController");

const router = express.Router()

router
  .route("/")
  .post(createContact)
  .get(getContacts);

router
  .route("/:contactId")
  .get(getOneContact)
  .delete(deleteContact)
  .put(changeContact)


module.exports = router
