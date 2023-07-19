const Joi = require("joi");

exports.createContactDataValidator = (data) =>
  Joi.object()
    .keys({
      name: Joi.string().min(3).required(),
      email: Joi.string().email().required(),
      phone: Joi.string().required(),
    })
    .validate(data);
