const User = require("../../models/userModel");
const { signToken } = require("../../services/jwtService");
const { AppError } = require("../../utils");

exports.loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user) throw new AppError(401, "Not authorized..");

  const passwordIsValid = await user.checkPassword(password, user.password);

  if (!passwordIsValid) throw new AppError(401, "Email or password is wrong");

  user.password = undefined;

  const token = signToken(user.id);

  return { user, token };
};
