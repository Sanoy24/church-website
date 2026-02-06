const express = require('express');
const router = express.Router();
const sermonController = require('../controllers/sermonController');
const auth = require('../middleware/auth');

router.get('/', sermonController.getAllSermons);
router.get('/recent', sermonController.getRecentSermons);
router.get('/:id', sermonController.getSermonById);
router.post('/', auth, sermonController.createSermon);
router.put('/:id', auth, sermonController.updateSermon);
router.delete('/:id', auth, sermonController.deleteSermon);

module.exports = router;
