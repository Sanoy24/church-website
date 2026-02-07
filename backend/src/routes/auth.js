const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');

router.post('/login', authController.login);
router.post('/signup', authController.signup);
router.put('/change-password', auth, authController.changePassword);
router.get('/me', auth, authController.getCurrentUser);
router.get('/users', auth, checkRole(['admin']), authController.getAllUsers);
router.delete('/users/:id', auth, checkRole(['admin']), authController.deleteUser);

module.exports = router;
