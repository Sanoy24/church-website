const GalleryPhoto = require("../models/GalleryPhoto");

exports.getAllGalleryPhotos = async (req, res) => {
    try {
        const photos = await GalleryPhoto.getAll();
        res.json(photos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getGalleryPhotoById = async (req, res) => {
    try {
        const photo = await GalleryPhoto.getById(req.params.id);
        if (!photo) {
            return res.status(404).json({ error: "Gallery photo not found" });
        }
        res.json(photo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createGalleryPhoto = async (req, res) => {
    try {
        const id = await GalleryPhoto.create(req.body);
        res.status(201).json({ id, message: "Gallery photo created successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createGalleryPhotosBulk = async (req, res) => {
    try {
        const ids = await GalleryPhoto.bulkCreate(req.body.photos);
        res.status(201).json({
            ids,
            count: ids.length,
            message: "Gallery photos created successfully",
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateGalleryPhoto = async (req, res) => {
    try {
        const affected = await GalleryPhoto.update(req.params.id, req.body);
        if (affected === 0) {
            return res.status(404).json({ error: "Gallery photo not found" });
        }
        res.json({ message: "Gallery photo updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteGalleryPhoto = async (req, res) => {
    try {
        const affected = await GalleryPhoto.delete(req.params.id);
        if (affected === 0) {
            return res.status(404).json({ error: "Gallery photo not found" });
        }
        res.json({ message: "Gallery photo deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
