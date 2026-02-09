const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const hpp = require("hpp");
const path = require("path");
const xss = require("xss-clean");
const { apiLimiter } = require("./middleware/rateLimiter");
const errorHandler = require("./middleware/errorHandler");
const ministriesRoutes = require("./routes/ministries");
const eventsRoutes = require("./routes/events");
const sermonsRoutes = require("./routes/sermons");
const donationsRoutes = require("./routes/donations");
const authRoutes = require("./routes/auth");
const uploadRoutes = require("./routes/upload");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security Middleware
app.use(
    helmet({
        crossOriginResourcePolicy: false, // Required for serving images to frontend
    }),
);

// Restrict CORS to specific origin in production
// const allowedOrigins = process.env.CORS_ORIGIN 
//     ? process.env.CORS_ORIGIN.split(',').map(origin => origin.trim()) 
//     : ["http://localhost:5173", "http://localhost:5174"];

// const corsOptions = {
//     origin: function (origin, callback) {
//         // allow requests with no origin (like mobile apps or curl requests)
//         if (!origin) return callback(null, true);
//         if (allowedOrigins.indexOf(origin) !== -1 || allowedOrigins.includes('*')) {
//             callback(null, true);
//         } else {
//             callback(new Error('Not allowed by CORS'));
//         }
//     },
//     credentials: true,
//     optionsSuccessStatus: 200,
// };
// const allowedOrigins = process.env.CORS_ORIGIN 
//     ? process.env.CORS_ORIGIN.split(',').map(origin => origin.trim()) 
//     : ["http://localhost:5173", "http://localhost:5174"];

const corsOptions = {
    origin: true,
    credentials: true,
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(xss()); // Prevent XSS attacks
app.use(hpp()); // Prevent HTTP Parameter Pollution
app.use(apiLimiter); // Global rate limiting

app.use(morgan("dev"));
app.use(express.json({ limit: "10kb" })); // Body limit to prevent DoS
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// Serve uploaded files statically
const uploadsPath = path.join(__dirname, "../uploads");
app.use("/uploads", express.static(uploadsPath));

// Health check
app.get("/api/health", (req, res) => {
    res.json({ status: "OK", timestamp: new Date().toISOString() });
});


// API Routes
app.use("/api/ministries", ministriesRoutes);
app.use("/api/events", eventsRoutes);
app.use("/api/sermons", sermonsRoutes);
app.use("/api/donations", donationsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});

// Error handler
app.use(errorHandler);

// Start server only when running locally (not in serverless environment)
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
        console.log(`📝 Environment: ${process.env.NODE_ENV}`);
        console.log(`🌐 CORS enabled for: ${process.env.CORS_ORIGIN}`);
    });
}

module.exports = app;

