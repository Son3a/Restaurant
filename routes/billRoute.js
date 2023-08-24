
const authMiddleWare = require('../middleware/authentication');
const express = require('express');
const router = express.Router();

const { createBill, getFoodsToPay } = require('../controller/BillController');

router.route('/create-bill').post(authMiddleWare,createBill)

router.route('/get-food-to-pay').post(authMiddleWare,getFoodsToPay)


module.exports = router;