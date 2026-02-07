const express = require("express");
const authController = require("../controllers/authController");
const auth = require("../middleware/auth");
const checkRole = require("../middleware/checkRole");

const { authLimiter } = require("../middleware/rateLimiter");
const { loginValidator, signupValidator } = require("../middleware/validators");

const router = express.Router();

router.post("/login", authLimiter, loginValidator, authController.login);
router.post(
    "/signup",
    auth,
    checkRole(["admin"]),
    authLimiter,
    signupValidator,
    authController.signup,
);
router.put(
    "/change-password",
    auth,
    signupValidator,
    authController.changePassword,
); // reusing signupValidator for password length check
router.get("/me", auth, authController.getCurrentUser);
router.get("/users", auth, checkRole(["admin"]), authController.getAllUsers);
router.delete(
    "/users/:id",
    auth,
    checkRole(["admin"]),
    authController.deleteUser,
);
router.put(
    "/users/:id/reset-password",
    auth,
    checkRole(["admin"]),
    signupValidator,
    authController.adminResetPassword,
);

module.exports = router;
