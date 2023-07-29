const { Schema, model } = require("mongoose");

const phoneRegexp =
  /^ [\+] ? [(] ? [0 - 9]{ 3}[)]?[-\s\.]?[0 - 9]{ 3 } [-\s\.] ? [0 - 9]{ 4, 6 } $/;
const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
    match: emailRegexp,
  },
  phone: {
    type: String,
    match: phoneRegexp,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

const Contact = model("Contact", contactSchema);

module.exports = Contact;
