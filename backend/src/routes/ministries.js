const express = require('express');
const router = express.Router();
const ministryController = require('../controllers/ministryController');
const auth = require('../middleware/auth');
const { ministryValidator } = require('../middleware/validators');

router.get('/', ministryController.getAllMinistries);
router.get('/:id', ministryController.getMinistryById);
router.post('/', auth, ministryValidator, ministryController.createMinistry);
router.put('/:id', auth, ministryValidator, ministryController.updateMinistry);
router.delete('/:id', auth, ministryController.deleteMinistry);

module.exports = router;
