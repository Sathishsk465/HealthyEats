const express = require('express');
const router = express.Router();
const { authAdmin, getAdminProfile, registerAdmin } = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');

router.post('/login', authAdmin);
router.route('/profile').get(protect, getAdminProfile);
router.post('/', registerAdmin); // For initial seeding

module.exports = router;
