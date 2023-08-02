const User = require("../../models/userModel")

exports.currentUser = async (id) => {
    const user = await User.findById(id);

    return user;
}