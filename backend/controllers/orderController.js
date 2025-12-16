const Order = require('../models/Order');

// @desc    Create new order
// @route   POST /api/orders
// @access  Public
const addOrderItems = async (req, res) => {
    const {
        orderItems,
        deliveryCharge,
        totalPrice,
        user,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400).json({ message: 'No order items' });
        return;
    }

    const order = new Order({
        orderItems,
        user,
        deliveryCharge,
        totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id name').populate('deliveryPartner');
    res.json(orders);
};

// @desc    Update order status
// @route   PUT /api/orders/:id
// @access  Private/Admin
const updateOrderStatus = async (req, res) => {
    const { status, deliveryPartnerId } = req.body;
    const order = await Order.findById(req.params.id);

    if (order) {
        order.status = status || order.status;
        if (deliveryPartnerId) {
            order.deliveryPartner = deliveryPartnerId;
        }
        if (status === 'Delivered') {
            order.isDelivered = true;
            order.deliveredAt = Date.now();
        }

        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } else {
        res.status(404).json({ message: 'Order not found' });
    }
};

module.exports = {
    addOrderItems,
    getOrders,
    updateOrderStatus,
};
