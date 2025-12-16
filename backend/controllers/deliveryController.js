const DeliveryPartner = require('../models/DeliveryPartner');

// @desc    Get all delivery partners
// @route   GET /api/delivery
// @access  Private/Admin
const getDeliveryPartners = async (req, res) => {
    const partners = await DeliveryPartner.find({});
    res.json(partners);
};

// @desc    Add a delivery partner
// @route   POST /api/delivery
// @access  Private/Admin
const addDeliveryPartner = async (req, res) => {
    const { name, phone, vehicleNumber } = req.body;

    const partner = new DeliveryPartner({
        name,
        phone,
        vehicleNumber,
    });

    const createdPartner = await partner.save();
    res.status(201).json(createdPartner);
};

// @desc    Update delivery partner status
// @route   PUT /api/delivery/:id
// @access  Private/Admin
const updateDeliveryPartner = async (req, res) => {
    const { status } = req.body;
    const partner = await DeliveryPartner.findById(req.params.id);

    if (partner) {
        partner.status = status;
        const updatedPartner = await partner.save();
        res.json(updatedPartner);
    } else {
        res.status(404).json({ message: 'Partner not found' });
    }
};

module.exports = {
    getDeliveryPartners,
    addDeliveryPartner,
    updateDeliveryPartner,
};
