const uploadController = {
  uploadImage: (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'Please upload a file' });
    }

    // Get the base URL from the request (protocol + host ex: http://localhost:5000)
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const fileUrl = `${baseUrl}/uploads/${req.file.filename}`;

    res.json({
      message: 'File uploaded successfully',
      url: fileUrl
    });
  }
};

module.exports = uploadController;
