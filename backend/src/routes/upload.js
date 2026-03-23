const express = require("express");
const router = express.Router();
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const { uploadLimiter } = require("../middleware/rateLimiter");
const auth = require("../middleware/auth");

const uploadsDir = path.join(__dirname, "../../uploads/");
fs.mkdirSync(uploadsDir, { recursive: true });

// Configure multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadsDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    },
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("image/")) {
            cb(null, true);
        } else {
            cb(new Error("Only images are allowed"), false);
        }
    },
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

// Route: POST /api/upload
// Access: Private
router.post("/", auth, uploadLimiter, upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "Please upload an image" });
    }

    const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    res.status(201).json({
        message: "Image uploaded successfully",
        url: fileUrl,
    });
});

// Route: POST /api/upload/bulk
// Access: Private
router.post(
    "/bulk",
    auth,
    uploadLimiter,
    upload.array("images", 100),
    (req, res) => {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: "Please upload at least one image" });
        }

        const files = req.files.map((file) => ({
            originalName: file.originalname,
            filename: file.filename,
            url: `${req.protocol}://${req.get("host")}/uploads/${file.filename}`,
        }));

        res.status(201).json({
            message: "Images uploaded successfully",
            count: files.length,
            files,
        });
    },
);

module.exports = router;
