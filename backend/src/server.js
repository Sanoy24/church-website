const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const path = require('path');
const errorHandler = require('./middleware/errorHandler');

// Import routes
const ministriesRoutes = require('./routes/ministries');
const eventsRoutes = require('./routes/events');
const sermonsRoutes = require('./routes/sermons');
const donationsRoutes = require('./routes/donations');
const authRoutes = require('./routes/auth');
const uploadRoutes = require('./routes/upload');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet({
  crossOriginResourcePolicy: false,
}));
app.use(cors()); // Allow all origins for debugging
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically
const uploadsPath = path.join(__dirname, '../uploads');
app.use('/uploads', express.static(uploadsPath));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/ministries', ministriesRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/sermons', sermonsRoutes);
app.use('/api/donations', donationsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
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
