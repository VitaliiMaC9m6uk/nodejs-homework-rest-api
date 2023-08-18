const { Router } = require("express");
const { checkCreateUser, checkLoginUser, protect, checkVerifyUser } = require("../../middlewares/userMiddlewares");
const { signup, login, current, logout, updateMe } = require("../../controllers/userControllers");
const { uploadUserAvatar } = require("../../services/imageService");
const { verifyEmail, resendVerifyEmail } = require("../../controllers/emailControllers");

const router = Router();

router.post("/register", checkCreateUser, signup);
router.post("/login", checkLoginUser, checkVerifyUser,login);
router.get("/logout", protect,logout);
router.get("/current", protect, current);
router.patch("/avatars", protect, uploadUserAvatar, updateMe)
router.get("/verify/:verificationToken", verifyEmail);
router.post("/verify", resendVerifyEmail);

module.exports = router;