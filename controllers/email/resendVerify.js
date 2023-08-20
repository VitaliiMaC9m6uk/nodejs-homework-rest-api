const User = require("../../models/userModel");
const { userValidators, AppError } = require("../../utils");
const { sendEmail } = require("./singUp");

exports.resendVerifyEmail = async (body) => {   
    
    const { error } = userValidators.userVerifyEmail(body);

    if (error) throw new AppError(400, "");

    const user = await User.find({ email:body.email});
    if (!user) throw new AppError(400, 'Email is wrong');
    
    if (user[0].verify) throw new AppError(400,"Verification has already been passed")

    const verifyEmail = {
        to: user[0].email,
        subject: "Verify email",
        html: `${process.env.BASE_URL}/users/verify/${user[0].verificationToken}  Click verify email`,
    }

    await sendEmail(verifyEmail);

    return;
}