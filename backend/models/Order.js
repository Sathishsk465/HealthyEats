const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    user: {
        name: { type: String, required: true },
        address: { type: String, required: true },
        phone: { type: String, required: true },
    },
    orderItems: [
        {
            title: { type: String, required: true },
            qty: { type: Number, required: true },
            image: { type: String, required: true },
            price: { type: Number, required: true },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Food',
                required: true,
            },
        },
    ],
    deliveryCharge: { type: Number, default: 0.0 },
    totalPrice: { type: Number, required: true },
    status: {
        type: String,
        required: true,
        default: 'Pending',
        enum: ['Pending', 'Preparing', 'Out for delivery', 'Delivered'],
    },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
    deliveryPartner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DeliveryPartner',
    },
}, {
    timestamps: true,
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
