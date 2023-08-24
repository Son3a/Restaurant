const {
    getListDepositByClient,
    getListDepositByBooking,
    getDepositDetail,
    confirmDeposit } = require('../controller/DepositController');
const express = require('express');
const router = express.Router();

const authMiddleWare = require('../middleware/authentication');


router.route('/get-deposit-by-client').get(authMiddleWare, getListDepositByClient)
router.route('/get-deposit-by-booking/:id').get(authMiddleWare, getListDepositByBooking)
router.route('/get-deposit-detail/:id').get(authMiddleWare, getDepositDetail)
router.route('/confirm-deposit').put(authMiddleWare, confirmDeposit)

module.exports = router;