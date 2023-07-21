const { getCategories } = require('../controller/CategoryController');
const express = require('express');
const router = express.Router();

router.route('/get-categories').get(getCategories)

module.exports = router;