const express = require("express");
const router = express.Router();
const galleryController = require("../controllers/galleryController");
const auth = require("../middleware/auth");
const checkRole = require("../middleware/checkRole");
const {
    galleryValidator,
    galleryBulkValidator,
} = require("../middleware/validators");

router.get("/", galleryController.getAllGalleryPhotos);
router.post(
    "/bulk",
    auth,
    checkRole(["admin", "editor"]),
    galleryBulkValidator,
    galleryController.createGalleryPhotosBulk,
);
router.get("/:id", galleryController.getGalleryPhotoById);
router.post(
    "/",
    auth,
    checkRole(["admin", "editor"]),
    galleryValidator,
    galleryController.createGalleryPhoto,
);
router.put(
    "/:id",
    auth,
    checkRole(["admin", "editor"]),
    galleryValidator,
    galleryController.updateGalleryPhoto,
);
router.delete(
    "/:id",
    auth,
    checkRole(["admin"]),
    galleryController.deleteGalleryPhoto,
);

module.exports = router;
