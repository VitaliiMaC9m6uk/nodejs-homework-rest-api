const User = require("../../models/userModel");
const { signToken } = require("../../services/jwtService");

exports.createUser = async (body) => {

  const user = await User.create(body);  

  await user.save();

  user.password = undefined;
  
  return user;
};