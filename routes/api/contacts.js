const express = require('express');

const {
  getContacts,
  getOneContact,
  createContact,
  deleteContact,
  changeContact,
} = require("../../controllers/contactController");
const { checkContactId, checkCreateContactData } = require('../../middlewares/contactMiddlewares');

const router = express.Router()

router
  .route("/")
  .post(checkCreateContactData,createContact)
  .get(getContacts);

router.use("/:contactId",checkContactId);  
router
  .route("/:contactId")
  .get(getOneContact)
  .delete(deleteContact)
  .put(changeContact)


module.exports = router
