const mongoose = require('mongoose');

const foodSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true }, // e.g., 'Breakfast', 'Lunch', 'Dinner'
    deliveryTime: { type: String, required: true },
    availability: { type: Boolean, default: true },
    isVeg: { type: Boolean, default: true },
}, {
    timestamps: true,
});

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;
