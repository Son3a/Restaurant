const { getTables } = require('../controller/TableController');
const express = require('express');
const router = express.Router();

router.route('/get-tables').get(getTables)

module.exports = router;