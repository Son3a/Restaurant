const { register, login, changePassword, forgotPassword, updatePasswordForgot, getInfoUser, updateInfoUser } = require('../controller/AuthController');
const authMiddleWare = require('../middleware/authentication');
const express = require('express');
const router = express.Router();

router.route('/register').post(register)

router.route('/login').post(login)

router.route('/change-password').post(authMiddleWare, changePassword)

router.route('/forgot-password').post(forgotPassword)

router.route('/update-password-forgot').put(updatePasswordForgot)

router.route('/get-info-user').get(authMiddleWare,getInfoUser)

router.route('/update-info-user').post(authMiddleWare,updateInfoUser)

module.exports = router;