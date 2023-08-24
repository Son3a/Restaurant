const express = require('express');
const router = express.Router();
const authMiddleWare = require('../middleware/authentication');

const {
    getTablesToBooking,
    bookingTable,
    deposit,
    bookingFood,
    bookingTableAndDeposit,
    getBookingHistoryByClient,
    getBookingHistory,
    getBookingNow,
    getAllBookings,
    getBookingsByStatus,
    getBookingDetail,
    confirmBooking,
    cancelBooking,
    updateNumOfFoodBooking,
    updateNumOfFoodBookingUser,
    getBookingInCurrentDay,
    addFoodToBooking,
    deleteFoodToBooking,
    addFoodsToBooking } = require('../controller/BookingController')

router.route('/get-tables-to-booking').post(getTablesToBooking)

router.route('/booking-table').post(authMiddleWare, bookingTable)

router.route('/deposit').post(authMiddleWare, deposit)

router.route('/booking-food').post(authMiddleWare, bookingFood)

router.route('/booking-table-and-deposit').post(authMiddleWare, bookingTableAndDeposit)

router.route('/get-booking-history-by-client').get(authMiddleWare, getBookingHistoryByClient)

router.route('/get-booking-history').post(authMiddleWare, getBookingHistory)

router.route('/get-booking-now').get(authMiddleWare, getBookingNow)

router.route('/get-all-bookings').get(getAllBookings)

router.route('/get-bookings-by-status/:id').get(getBookingsByStatus)

router.route('/get-booking-detail/:id').get(authMiddleWare, getBookingDetail)

router.route('/confirm-booking').put(authMiddleWare, confirmBooking)

router.route('/cancel-booking').put(authMiddleWare, cancelBooking)

router.route('/update-num-of-food').put(authMiddleWare, updateNumOfFoodBooking)

router.route('/update-num-of-food-user').put(authMiddleWare, updateNumOfFoodBookingUser)

router.route('/update-booking-in-current-day').post(getBookingInCurrentDay)

router.route('/add-food-to-booking').put(addFoodToBooking)

router.route('/delete-food-in-booking').delete(deleteFoodToBooking)

router.route('/add-foods-to-booking').post(addFoodsToBooking)

module.exports = router;