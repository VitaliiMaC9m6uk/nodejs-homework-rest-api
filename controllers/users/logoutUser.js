const redis = require("redis");
const User = require("../../models/userModel");
const { AppError } = require("../../utils");

exports.logoutUser = async (id) => {    
    const user = await User.findById(id);

    if (!user) throw new AppError(401, "Not autorized");    
    
    user.token = null;
    await user.save();
       
    return user;
}