const Ministry = require('../models/Ministry');

exports.getAllMinistries = async (req, res) => {
  try {
    const ministries = await Ministry.getAll();
    res.json(ministries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMinistryById = async (req, res) => {
  try {
    const ministry = await Ministry.getById(req.params.id);
    if (!ministry) {
      return res.status(404).json({ error: 'Ministry not found' });
    }
    res.json(ministry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createMinistry = async (req, res) => {
  try {
    const id = await Ministry.create(req.body);
    res.status(201).json({ id, message: 'Ministry created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateMinistry = async (req, res) => {
  try {
    const affected = await Ministry.update(req.params.id, req.body);
    if (affected === 0) {
      return res.status(404).json({ error: 'Ministry not found' });
    }
    res.json({ message: 'Ministry updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteMinistry = async (req, res) => {
  try {
    const affected = await Ministry.delete(req.params.id);
    if (affected === 0) {
      return res.status(404).json({ error: 'Ministry not found' });
    }
    res.json({ message: 'Ministry deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
