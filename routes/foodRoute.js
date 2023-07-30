const { getPrices, getFoodsByCategory, getTopFoods } = require('../controller/FoodController');
const express = require('express');
const router = express.Router();

router.route('/get-foods-price').get(getPrices)
router.route('/get-food-by-category/:id').get(getFoodsByCategory)
router.route('/get-top-foods').get(getTopFoods)

module.exports = router;