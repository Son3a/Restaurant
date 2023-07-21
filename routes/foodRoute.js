const { getPrices } = require('../controller/FoodController');
const express = require('express');
const router = express.Router();

router.route('/get-foods-price').get(getPrices)

module.exports = router;