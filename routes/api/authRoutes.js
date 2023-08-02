const { Router } = require("express");
const { checkCreateUser, checkLoginUser, protect } = require("../../middlewares/userMiddlewares");
const { signup, login, current, logout } = require("../../controllers/userControllers");

const router = Router();

router.post("/register", checkCreateUser, signup);
router.post("/login",checkLoginUser,login);
router.get("/logout", protect,logout);
router.get("/current",protect,current);

module.exports = router;