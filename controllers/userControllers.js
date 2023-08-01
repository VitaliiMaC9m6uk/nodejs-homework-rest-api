const { catchAsync } = require("../utils");
const { create, login, logout, current } = require("./users");

exports.signup = catchAsync(async (req, res, next) => {
  const user = await create.createUser(req.body);

  req.user = user;
  res.status(201).json({ user });
});

exports.login = catchAsync(async (req, res) => {
  const user = await login.loginUser(req.body);

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
