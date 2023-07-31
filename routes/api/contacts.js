const express = require("express");

const {
  getContacts,
  getOneContact,
  createContact,
  deleteContact,
  changeContact,
  updateStatusContact,
} = require("../../controllers/contactController");

const {
  checkContactId,
  checkCreateContactData,
} = require("../../middlewares/contactMiddlewares");
const { protect } = require("../../middlewares/userMiddlewares");

const router = express.Router();

router.use(protect)

router.route("/").post(checkCreateContactData, createContact).get(getContacts);

router.use("/:contactId", checkContactId);
router
  .route("/:contactId")
  .get(getOneContact)
  .delete(deleteContact)
  .put(changeContact);

router.route("/:contactId/favorite").patch(updateStatusContact);

module.exports = router;
