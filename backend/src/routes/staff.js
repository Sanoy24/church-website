const express = require("express");
const router = express.Router();
const staffController = require("../controllers/staffController");
const auth = require("../middleware/auth");
const checkRole = require("../middleware/checkRole");
const { staffValidator } = require("../middleware/validators");

router.get("/", staffController.getPublicStaffMembers);
router.get(
    "/all",
    auth,
    checkRole(["admin", "editor"]),
    staffController.getAllStaffMembers,
);
router.get("/:id", staffController.getStaffMemberById);
router.post(
    "/",
    auth,
    checkRole(["admin", "editor"]),
    staffValidator,
    staffController.createStaffMember,
);
router.put(
    "/:id",
    auth,
    checkRole(["admin", "editor"]),
    staffValidator,
    staffController.updateStaffMember,
);
router.delete(
    "/:id",
    auth,
    checkRole(["admin"]),
    staffController.deleteStaffMember,
);

module.exports = router;
