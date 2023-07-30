const express = require('express');
const router = express.Router();

const {
    getTablesToBooking,
    bookingTable,
    deposit,
    bookingFood,
    bookingTableAndDeposit,
    getBookingHistoryByClient,
    getBookingHistory } = require('../controller/BookingController')   

router.route('/get-tables-to-booking').post(getTablesToBooking)

router.route('/booking-table').post(bookingTable)

router.route('/deposit').post(deposit)

router.route('/booking-food').post(bookingFood)

router.route('/booking-table-and-deposit').post(bookingTableAndDeposit)

router.route('/get-booking-history-by-client/:id').get(getBookingHistoryByClient)
router.route('/get-booking-history').post(getBookingHistory)

module.exports = router;