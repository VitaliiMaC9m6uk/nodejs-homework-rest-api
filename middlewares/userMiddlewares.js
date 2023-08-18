const User = require("../models/userModel");
// const ImageService = require("../services/imageService");
const jwtService = require("../services/jwtService")
const { catchAsync, userValidators, AppError } = require("../utils");

exports.checkCreateUser = catchAsync(async (req, res, next) => {
  const { error, value } = userValidators.signupUserDataValidator(req.body);

  if (error) {
    throw new AppError(400, "Invalid user data");
  }

  const userExists = await User.exists({ email: value.email });

  if (userExists) throw new AppError(409, "Email in use");

  req.body = value;

  next();
});

exports.checkLoginUser = catchAsync(async (req, res, next) => {
  const { error, value } = userValidators.loginUserDataValidator(req.body);

  if (error) {
    throw new AppError(400, "Invalid user data");
  }

  next();
});

exports.protect = catchAsync(async (req, res, next) => {
  const token = req.headers.authorization?.startsWith("Bearer") && req.headers.authorization.split(" ")[1];
  const userId = jwtService.checkToken(token);

  const currentUser = await User.findById(userId);

  if (!currentUser) throw new AppError(401, "Not authorized");

  req.user = currentUser;
  next();
});

exports.checkVerifyUser = catchAsync(async (req, res, next) => {
  const email = req.body.email;

  const user = await User.find({ email });

  if(!user[0].verify) throw new AppError(400,'User not verify Email')

  next();
})
// exports.uploadUserAvatar = ImageService.upload('avatars');