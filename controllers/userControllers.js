const { catchAsync } = require("../utils");
const { create, login, logout } = require("./users");

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await create.createUser(req.body);

  res.status(201).json(newUser);
});

exports.login = catchAsync(async (req, res) => {
  const { user, token } = await login.loginUser(req.body);

  res.status(200).json({
    user,
    token,
  });
});

exports.current = catchAsync(async (req, res, next) => {
  res.status(200).json({ user: req.user });
});

exports.logout = catchAsync(async (req, res, next) => {
  await logout.logoutUser(req.user._id);
  
  res.status(204)
})