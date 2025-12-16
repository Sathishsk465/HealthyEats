const Food = require('../models/Food');

// @desc    Fetch all foods
// @route   GET /api/foods
// @access  Public
const getFoods = async (req, res) => {
    try {
        const foods = await Food.find({});
        res.json(foods);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Fetch single food
// @route   GET /api/foods/:id
// @access  Public
const getFoodById = async (req, res) => {
    const food = await Food.findById(req.params.id);

    if (food) {
        res.json(food);
    } else {
        res.status(404).json({ message: 'Food not found' });
    }
};

// @desc    Create a food item
// @route   POST /api/foods
// @access  Private/Admin
const createFood = async (req, res) => {
    const {
        title,
        description,
        price,
        image,
        category,
        deliveryTime,
        availability,
        isVeg,
    } = req.body;

    const food = new Food({
        title,
        description,
        price,
        image,
        category,
        deliveryTime,
        availability,
        isVeg,
    });

    const createdFood = await food.save();
    res.status(201).json(createdFood);
};

// @desc    Update a food item
// @route   PUT /api/foods/:id
// @access  Private/Admin
const updateFood = async (req, res) => {
    const {
        title,
        description,
        price,
        image,
        category,
        deliveryTime,
        availability,
        isVeg,
    } = req.body;

    const food = await Food.findById(req.params.id);

    if (food) {
        food.title = title || food.title;
        food.description = description || food.description;
        food.price = price || food.price;
        food.image = image || food.image;
        food.category = category || food.category;
        food.deliveryTime = deliveryTime || food.deliveryTime;
        food.availability = availability !== undefined ? availability : food.availability;
        food.isVeg = isVeg !== undefined ? isVeg : food.isVeg;

        const updatedFood = await food.save();
        res.json(updatedFood);
    } else {
        res.status(404).json({ message: 'Food not found' });
    }
};

// @desc    Delete a food item
// @route   DELETE /api/foods/:id
// @access  Private/Admin
const deleteFood = async (req, res) => {
    const food = await Food.findById(req.params.id);

    if (food) {
        await food.deleteOne();
        res.json({ message: 'Food removed' });
    } else {
        res.status(404).json({ message: 'Food not found' });
    }
};

module.exports = {
    getFoods,
    getFoodById,
    createFood,
    updateFood,
    deleteFood,
};
