const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/eventController'); // Renamed to match usage in routes
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');
const { eventValidator } = require('../middleware/validators');

router.get('/', eventsController.getAllEvents);
router.get('/calendar/:year/:month', eventsController.getEventsByCalendar); // Kept original route, but changed controller name
router.get('/:id', eventsController.getEventById);
router.post('/', auth, checkRole(['admin', 'editor']), eventValidator, eventsController.createEvent);
router.put('/:id', auth, checkRole(['admin', 'editor']), eventValidator, eventsController.updateEvent);
router.delete('/:id', auth, checkRole(['admin']), eventsController.deleteEvent);

module.exports = router;
