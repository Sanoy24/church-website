const express = require('express');
const router = express.Router();
const ministryController = require('../controllers/ministryController');
const auth = require('../middleware/auth');

router.get('/', ministryController.getAllMinistries);
router.get('/:id', ministryController.getMinistryById);
router.post('/', auth, ministryController.createMinistry);
router.put('/:id', auth, ministryController.updateMinistry);
router.delete('/:id', auth, ministryController.deleteMinistry);

module.exports = router;
