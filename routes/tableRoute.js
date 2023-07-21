const tableController = require('../controller/TableController');
const express = require('express');
const router = express.Router();

router.route('/').get(tableController.getTable)

module.exports = router;