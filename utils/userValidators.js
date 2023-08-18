const Joi = require("joi");

const PASSWD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,128})/;

exports.signupUserDataValidator = (data) =>
  Joi.object()
    .keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      subscription: Joi.string(),
    })
    .validate(data);

exports.loginUserDataValidator = (data) =>
  Joi.object()
    .keys({
      email: Joi.string().email().required(),
      password: Joi.string().regex(PASSWD_REGEX).required(),
    })
    .validate(data);

exports.userVerifyEmail = (data) =>
  Joi.object()
    .keys({
  email: Joi.string()  
    .email()
    .required()    
    })
.validate(data)