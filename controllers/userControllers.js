const  uuid  = require('uuid').v4;
const { catchAsync } = require("../utils");
const { sendEmail } = require('./email/singUp');
const { create, login, logout, current, update } = require("./users");

exports.signup = catchAsync(async (req, res, next) => {
  const verificationToken = uuid();
  const user = await create.createUser({ ...req.body, verificationToken }); 
  
  const verifyEmail = {
    to: req.body.email,
    subject: "Verify email",
    html: `<a  href="${process.env.BASE_URL}/users/verify/${verificationToken}">Click verify email</a>`,
  }

  await sendEmail(verifyEmail);

  req.user = user;
  res.status(201).json({ user });
});

exports.login = catchAsync(async (req, res) => {
  const user = await login.loginUser(req.body);

  req.user = user;
  res.status(200).json({
    user
  });
});

exports.current = catchAsync(async (req, res, next) => {
  const user = await current.currentUser(req.user.id);

  res.status(200).json({ user });
});

exports.logout = catchAsync(async (req, res, next) => {

  const user = await logout.logoutUser(req.user.id);

  res.status(204).json({ user });
});

exports.updateMe = catchAsync(async (req, res) => {
  const { user, file } = req;

  const updateUser = await update.updateUser(user, file);
  res.status(200).json({
    user: updateUser
  })
})