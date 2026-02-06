const Donation = require('../models/Donation');

exports.getAllDonations = async (req, res) => {
  try {
    const donations = await Donation.getAll();
    res.json(donations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDonationById = async (req, res) => {
  try {
    const donation = await Donation.getById(req.params.id);
    if (!donation) {
      return res.status(404).json({ error: 'Donation account not found' });
    }
    res.json(donation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createDonation = async (req, res) => {
  try {
    const id = await Donation.create(req.body);
    res.status(201).json({ id, message: 'Donation account created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateDonation = async (req, res) => {
  try {
    const affected = await Donation.update(req.params.id, req.body);
    if (affected === 0) {
      return res.status(404).json({ error: 'Donation account not found' });
    }
    res.json({ message: 'Donation account updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteDonation = async (req, res) => {
  try {
    const affected = await Donation.delete(req.params.id);
    if (affected === 0) {
      return res.status(404).json({ error: 'Donation account not found' });
    }
    res.json({ message: 'Donation account deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
