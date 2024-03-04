const express = require('express');
const {
  register,
  login,
  getMe,
  logout,
} = require('../controllers/userController');

const router = express.Router();

const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

router.post('/register', upload.single('profile'), register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.get('/logout', logout);

module.exports = router;
