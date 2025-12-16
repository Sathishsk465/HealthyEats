const express = require('express');
const router = express.Router();
const {
    addOrderItems,
    getOrders,
    updateOrderStatus,
} = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(addOrderItems).get(protect, getOrders);
router.route('/:id').put(protect, updateOrderStatus);

module.exports = router;
