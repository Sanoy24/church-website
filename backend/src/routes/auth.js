const express = require("express");
const authController = require("../controllers/authController");
const auth = require("../middleware/auth");
const checkRole = require("../middleware/checkRole");

const { authLimiter } = require("../middleware/rateLimiter");
const { 
    loginValidator, 
    signupValidator, 
    changePasswordValidator, 
    adminResetPasswordValidator 
} = require("../middleware/validators");

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
    changePasswordValidator,
    authController.changePassword,
);
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
    adminResetPasswordValidator,
    authController.adminResetPassword,
);

module.exports = router;
