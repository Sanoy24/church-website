const { body, validationResult } = require("express-validator");

// Middleware to check for validation errors
const validate = (req, res, next) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: "Validation failed",
            details: errors
                .array()
                .map((err) => ({ field: err.path, message: err.msg })),
        });
    }
    next();
};

// Auth validators
const loginValidator = [
    body("email")
        .isEmail()
        .withMessage("Please provide a valid email address")
        .normalizeEmail(),
    body("password").notEmpty().withMessage("Password is required"),
    validate,
];

const signupValidator = [
    body("email")
        .isEmail()
        .withMessage("Please provide a valid email address")
        .normalizeEmail(),
    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
    body("role")
        .optional()
        .isIn(["admin", "editor"])
        .withMessage("Invalid role"),
    validate,
];

const changePasswordValidator = [
    body("currentPassword")
        .notEmpty()
        .withMessage("Current password is required"),
    body("newPassword")
        .isLength({ min: 6 })
        .withMessage("New password must be at least 6 characters long"),
    validate,
];

const adminResetPasswordValidator = [
    body("newPassword")
        .isLength({ min: 6 })
        .withMessage("New password must be at least 6 characters long"),
    validate,
];

// Content validators (Ministries, Events, Sermons)
const ministryValidator = [
    body("title").notEmpty().trim().withMessage("Title is required"),
    body("description")
        .notEmpty()
        .trim()
        .withMessage("Short description is required"),
    body("detailed_description")
        .notEmpty()
        .trim()
        .withMessage("Detailed description is required"),
    body("image_url").optional().isURL({ require_tld: false }).withMessage("Invalid image URL"),
    validate,
];

const eventValidator = [
    body("title").notEmpty().trim().withMessage("Title is required"),
    body("description")
        .notEmpty()
        .trim()
        .withMessage("Description is required"),
    body("date").isDate().withMessage("Invalid date format"),
    body("time").notEmpty().trim().withMessage("Time is required"),
    body("location").notEmpty().trim().withMessage("Location is required"),
    body("image_url").optional().isURL({ require_tld: false }).withMessage("Invalid image URL"),
    validate,
];

const sermonValidator = [
    body("title").notEmpty().trim().withMessage("Title is required"),
    body("preacher").notEmpty().trim().withMessage("Preacher name is required"),
    body("date").isDate().withMessage("Invalid date format"),
    body("video_url").optional().isURL({ require_tld: false }).withMessage("Invalid video URL"),
    body("image_url").optional().isURL({ require_tld: false }).withMessage("Invalid image URL"),
    validate,
];

const donationValidator = [
    body("bank_name").notEmpty().trim().withMessage("Bank name is required"),
    body("account_name")
        .notEmpty()
        .trim()
        .withMessage("Account name is required"),
    body("account_number")
        .notEmpty()
        .trim()
        .withMessage("Account number is required"),
    validate,
];

module.exports = {
    loginValidator,
    signupValidator,
    changePasswordValidator,
    adminResetPasswordValidator,
    ministryValidator,
    eventValidator,
    sermonValidator,
    donationValidator,
};
