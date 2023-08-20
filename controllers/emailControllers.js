const { catchAsync } = require("../utils");
const { verify, resendVerify } = require('./email');

exports.verifyEmail = catchAsync(async (req, res, next) => {
    const { verificationToken } = req.params;

    await verify.verifyEmail(verificationToken);

    res.status(200).json({
        message:"Verification successful"
    })
})

exports.resendVerifyEmail = catchAsync(async (req, res, next) => {
    await resendVerify.resendVerifyEmail(req.body);

    res.status(200).json({ message: 'Verification email sent' })
})