const User = require("../../models/userModel");
const { signToken } = require("../../services/jwtService");

exports.createUser = async (body) => {
  const newUser = await User.create(body);

  newUser.password = undefined;

  const token = signToken(newUser.id);

  return { user: newUser, token };
};
