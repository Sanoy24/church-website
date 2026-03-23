const express = require("express");
const cors = require("cors");
const fs = require("fs");
const helmet = require("helmet");
const morgan = require("morgan");
const hpp = require("hpp");
const path = require("path");
const xss = require("xss-clean");
// const { apiLimiter } = require("./middleware/rateLimiter");
const errorHandler = require("./middleware/errorHandler");
const ministriesRoutes = require("./routes/ministries");
const eventsRoutes = require("./routes/events");
const sermonsRoutes = require("./routes/sermons");
const galleryRoutes = require("./routes/gallery");
const donationsRoutes = require("./routes/donations");
const staffRoutes = require("./routes/staff");
const authRoutes = require("./routes/auth");
const uploadRoutes = require("./routes/upload");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const isProduction = process.env.NODE_ENV === "production";

// Security Middleware
app.use(
    helmet({
        crossOriginResourcePolicy: false, // Required for serving images to frontend
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                baseUri: ["'self'"],
                fontSrc: ["'self'", "https:", "data:"],
                formAction: ["'self'"],
                frameAncestors: ["'self'"],
                imgSrc: [
                    "'self'",
                    "data:",
                    "https://i.imgur.com",
                    "https://images.unsplash.com",
                    "https://img.youtube.com",
                ],
                objectSrc: ["'none'"],
                scriptSrc: ["'self'"],
                scriptSrcAttr: ["'none'"],
                styleSrc: ["'self'", "https:", "'unsafe-inline'"],
                connectSrc: ["'self'", "https:"],
                upgradeInsecureRequests: [],
            },
        },
    }),
);

// Restrict CORS to specific origin in production
const corsOptions = {
    origin: process.env.CORS_ORIGIN || "http://localhost:5174",
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(xss()); // Prevent XSS attacks
app.use(hpp()); // Prevent HTTP Parameter Pollution
// app.use(apiLimiter); // Global rate limiting

// app.use(morgan("dev"));
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true, limit: "2mb" }));

// Serve uploaded files statically
const uploadsPath = path.join(__dirname, "../uploads");
app.use("/uploads", express.static(uploadsPath));

// Health check
app.get("/health", (req, res) => {
    res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// API Routes
app.use("/api/ministries", ministriesRoutes);
app.use("/api/events", eventsRoutes);
app.use("/api/sermons", sermonsRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/donations", donationsRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);

const frontendCandidates = [
    process.env.FRONTEND_DIST_PATH,
    path.join(__dirname, "../public"),
    path.join(__dirname, "../../frontend/dist"),
]
    .filter(Boolean)
    .map((candidate) => path.resolve(candidate));

const frontendDistPath = frontendCandidates.find((candidate) =>
    fs.existsSync(path.join(candidate, "index.html")),
);

if (isProduction && frontendDistPath) {
    app.use(express.static(frontendDistPath));

    app.get("*", (req, res, next) => {
        if (
            req.path.startsWith("/api") ||
            req.path.startsWith("/uploads") ||
            req.path === "/health"
        ) {
            return next();
        }

        return res.sendFile(path.join(frontendDistPath, "index.html"));
    });
}

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

// Error handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📝 Environment: ${process.env.NODE_ENV}`);
    console.log(`🌐 CORS enabled for: ${process.env.CORS_ORIGIN}`);
});

module.exports = app;
