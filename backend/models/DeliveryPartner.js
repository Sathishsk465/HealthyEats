const mongoose = require('mongoose');

const deliveryPartnerSchema = mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    vehicleNumber: { type: String, required: true },
    status: {
        type: String,
        default: 'Available',
        enum: ['Available', 'Busy', 'Offline'],
    },
}, {
    timestamps: true,
});

const DeliveryPartner = mongoose.model('DeliveryPartner', deliveryPartnerSchema);

module.exports = DeliveryPartner;
