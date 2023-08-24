
const express = require('express');
const router = express.Router();

const { 
    statisticalByDate,
    statisticalByMonth } = require('../controller/StatisticalController');

router.route('/statistical-by-date').post(statisticalByDate)

router.route('/statistical-by-month').post(statisticalByMonth)

module.exports = router;