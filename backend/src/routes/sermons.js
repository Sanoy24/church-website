const express = require('express');
const router = express.Router();
const sermonController = require('../controllers/sermonController');
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');
const { sermonValidator } = require('../middleware/validators');

router.get('/', sermonController.getAllSermons);
router.get('/recent', sermonController.getRecentSermons);
router.get('/:id', sermonController.getSermonById);
router.post('/', auth, checkRole(['admin', 'editor']), sermonValidator, sermonController.createSermon);
router.put('/:id', auth, checkRole(['admin', 'editor']), sermonValidator, sermonController.updateSermon);
router.delete('/:id', auth, checkRole(['admin']), sermonController.deleteSermon);

module.exports = router;
