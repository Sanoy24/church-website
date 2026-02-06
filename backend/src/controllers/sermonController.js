const Sermon = require('../models/Sermon');

exports.getAllSermons = async (req, res) => {
  try {
    const { limit = 100, offset = 0, search = '' } = req.query;
    const sermons = await Sermon.getAll(parseInt(limit), parseInt(offset), search);
    res.json(sermons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRecentSermons = async (req, res) => {
  try {
    const { limit = 5 } = req.query;
    const sermons = await Sermon.getRecent(parseInt(limit));
    res.json(sermons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSermonById = async (req, res) => {
  try {
    const sermon = await Sermon.getById(req.params.id);
    if (!sermon) {
      return res.status(404).json({ error: 'Sermon not found' });
    }
    res.json(sermon);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createSermon = async (req, res) => {
  try {
    const id = await Sermon.create(req.body);
    res.status(201).json({ id, message: 'Sermon created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateSermon = async (req, res) => {
  try {
    const affected = await Sermon.update(req.params.id, req.body);
    if (affected === 0) {
      return res.status(404).json({ error: 'Sermon not found' });
    }
    res.json({ message: 'Sermon updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteSermon = async (req, res) => {
  try {
    const affected = await Sermon.delete(req.params.id);
    if (affected === 0) {
      return res.status(404).json({ error: 'Sermon not found' });
    }
    res.json({ message: 'Sermon deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
