const {
    getPrices,
    getFoodsByCategory,
    getTopFoods,
    getFoodByBooking,
    getFoodSaleOff,
    getPriceFoodsWithSaleOff,
    updatePriceFood,
    getBookingAndFood } = require('../controller/FoodController');
const express = require('express');
const router = express.Router();

const authMiddleWare = require('../middleware/authentication');

router.route('/get-foods-price').get(getPrices)
router.route('/get-food-by-category/:id').get(getFoodsByCategory)
router.route('/get-top-foods/:id').get(getTopFoods)
router.route('/get-food-booking').post(getFoodByBooking)
router.route('/get-food-sale-off').get(getFoodSaleOff)
router.route('/get-price-food-with-sale-off').get(getPriceFoodsWithSaleOff)
router.route('/update-price-food').post(authMiddleWare, updatePriceFood)
router.route('/get-booking-and-food/:id').get(getBookingAndFood)

module.exports = router;