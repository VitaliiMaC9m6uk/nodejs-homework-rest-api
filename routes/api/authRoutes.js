const { Router } = require("express");
const { checkCreateUser, checkLoginUser, protect } = require("../../middlewares/userMiddlewares");
const { signup, login, current, logout, updateMe } = require("../../controllers/userControllers");
const { uploadUserAvatar } = require("../../services/imageService");

const router = Router();

router.post("/register", checkCreateUser, signup);
router.post("/login",checkLoginUser,login);
router.get("/logout", protect,logout);
router.get("/current", protect, current);
router.patch("/avatars", protect, uploadUserAvatar, updateMe)

module.exports = router;