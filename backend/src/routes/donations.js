const express = require('express');
const router = express.Router();
const donationController = require('../controllers/donationController');
const auth = require('../middleware/auth');

router.get('/', donationController.getAllDonations);
router.get('/:id', donationController.getDonationById);
router.post('/', auth, donationController.createDonation);
router.put('/:id', auth, donationController.updateDonation);
router.delete('/:id', auth, donationController.deleteDonation);

module.exports = router;
