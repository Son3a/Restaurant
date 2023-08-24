const express = require('express');
const router = express.Router();

const { findTables, getAllRooms, getTablesBusy } = require('../controller/TableController');

router.route('/find-tables').post(findTables)

router.route('/get-rooms').get(getAllRooms)

router.route('/get-tables-busy').get(getTablesBusy)

module.exports = router;