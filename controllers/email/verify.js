const User = require("../../models/userModel");
const { AppError } = require("../../utils");

exports.verifyEmail = async (verificationToken) => {
    const user = await User.find({ verificationToken });

    if (!user) throw new AppError(404, "User not found");
    
    const updateUser = await User.findByIdAndUpdate(user[0].id, { verify: true, verificationToken: ' '})
 
    return;
}