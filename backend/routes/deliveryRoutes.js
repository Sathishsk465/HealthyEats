const express = require('express');
const router = express.Router();
const {
    getDeliveryPartners,
    addDeliveryPartner,
    updateDeliveryPartner,
} = require('../controllers/deliveryController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getDeliveryPartners).post(protect, addDeliveryPartner);
router.route('/:id').put(protect, updateDeliveryPartner);

module.exports = router;
