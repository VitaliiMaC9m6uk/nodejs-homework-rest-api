const User = require("../../models/userModel");
const { signToken } = require("../../services/jwtService");
const { AppError } = require("../../utils");

exports.logoutUser = async (id) => {
    
    console.log(id)
    const user = await User.findById(id);

    if (!user) throw new AppError(401, "Not autorized");

    // await User.findByIdAndUpdate(id, { token: "" });
    // const token = signToken(user.id);
    return;
}