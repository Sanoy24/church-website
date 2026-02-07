const express = require('express');
const router = express.Router();
const donationsController = require('../controllers/donationController');
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');
const { donationValidator } = require('../middleware/validators');

router.get('/', donationsController.getAllDonations);
router.get('/:id', donationsController.getDonationById);
router.post('/', auth, checkRole(['admin']), donationValidator, donationsController.createDonation);
router.put('/:id', auth, checkRole(['admin']), donationValidator, donationsController.updateDonation);
router.delete('/:id', auth, checkRole(['admin']), donationsController.deleteDonation);

module.exports = router;
