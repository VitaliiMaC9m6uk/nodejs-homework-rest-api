const { saveImage } = require("../../services/imageService");

exports.updateUser = async (user, file) => {   
    const avatar = await saveImage(file, user.id)
    
    user.avatarURL = String(avatar);
    await user.save();
    
    return user;
}