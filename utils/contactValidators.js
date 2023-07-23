const Joi = require("joi");

// const PASSWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,128})/;

exports.createContactDataValidator = (data) =>
  Joi.object()
    .keys({
      name: Joi.string().min(3).required(),
      email: Joi.string().email().required(),
      phone: Joi.string().required(),
      favorite: Joi.boolean().required(),
    })
    .validate(data);

exports.updateContactDataValidator = (data) =>
  Joi.object()
    .keys({
      name: Joi.string().min(3),
      email: Joi.string().email(),
      phone: Joi.string(),
      favorite: Joi.boolean(),
    })
    .validate(data);
