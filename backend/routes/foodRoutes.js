const express = require('express');
const router = express.Router();
const {
    getFoods,
    getFoodById,
    createFood,
    updateFood,
    deleteFood,
} = require('../controllers/foodController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getFoods).post(protect, createFood);
router
    .route('/:id')
    .get(getFoodById)
    .put(protect, updateFood)
    .delete(protect, deleteFood);

module.exports = router;
