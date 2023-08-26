const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError, CustomAPIError } = require('../errors');
require('dotenv').config();
var config = require("../configDB/dbconfig")
const sql = require("mssql")
const { uid } = require('uid')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const e = require('cors');

const register = async (req, res) => {


    try {
        const { email, password, phoneNum, avatar, idRole, fName, lName, role } = req.body

        const salt = await bcrypt.genSalt(10);
        const passwordString = await bcrypt.hash(password, salt);

        let pool = await sql.connect(config)

        const idUser = uid(11)

        let result = await pool.request()
            .input("iduser", sql.NChar(11), idUser)
            .input("ho", sql.NVarChar(40), fName)
            .input("ten", sql.NVarChar(20), lName)
            .input("email", sql.NChar(100), email)
            .input("password", sql.NChar(100), passwordString)
            .input("sdt", sql.NChar(10), phoneNum)
            .input("avatar", sql.NChar(200), avatar)
            .input("maquyen", sql.NChar(11), idRole)
            .input("role", sql.NChar(1), role)
            .execute(process.env.SP_CREATE_ACCOUNT)

        res.status(StatusCodes.CREATED).json({
            message: "successful!",
            data: result.recordset
        })
    } catch (error) {
        console.log(error)
        res.status(StatusCodes.CONFLICT).json({
            message: error.message,
            statusCode: StatusCodes.CONFLICT
        })
    }

}

const login = async (req, res) => {

    try {
        const { email, password, role } = req.body;

        if (!email || !password) {
            res.status(StatusCodes.UNAUTHORIZED).json({ message: "Email or password is empty" })
        }

        let pool = await sql.connect(config)

        let result = await pool.request()
            .input('email', sql.NChar(100), email)
            .input('role', sql.NChar(11), role)
            .execute(process.env.SP_LOGIN)

        const dataResult = eval(result.recordset)

        const passwordString = dataResult[0]["PASSWORD"].trim()

        console.log(passwordString);

        const isMatch = await bcrypt.compare(password, passwordString);

        if (!isMatch) {
            throw new UnauthenticatedError("Mật khẩu không chính xác!")
        }

        const token = jwt.sign({
            userId: dataResult[0]["USERID"].trim(),
            role
        },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_LIFETIME });

        res.status(StatusCodes.OK).json({ data: result.recordset, token, message: "Successful" });

    } catch (error) {
        res.status(StatusCodes.UNAUTHORIZED).json({ message: "Email không chính xác!" })
    }
}

const changePassword = async (req, res) => {
    const { userId, role } = req.user
    const { password, newPassword } = req.body
    try {

        let pool = await sql.connect(config)
        let result1 = await pool.request()
            .input('userid', sql.NChar(11), userId)
            .input("role", sql.Int, role)
            .execute(process.env.SP_GET_PASSOWRD)

        const dataResult = eval(result1.recordset)

        const passwordString = dataResult[0]["PASSWORD"].trim()
        const isMatch = await bcrypt.compare(password, passwordString);

        if (!isMatch) {
            res.status(StatusCodes.UNAUTHORIZED).json({ message: "Mật khẩu không chính xác!" })
        }

        const salt = await bcrypt.genSalt(10);
        const newPasswordCode = await bcrypt.hash(newPassword, salt);

        let result = await pool.request()
            .input('userId', sql.NChar(11), userId)
            .input("newPassword", sql.NChar(100), newPasswordCode)
            .input("role", sql.Int, role)
            .execute(process.env.SP_CHANGGE_PASSWORD)

        res.status(StatusCodes.CREATED).json({
            message: "successful!",
            data: result.recordset
        })

    } catch (error) {
        res.status(StatusCodes.UNAUTHORIZED).json({ message: error })
    }

}

const updatePasswordForgot = async (req, res) => {

    const { email, newPassword, role } = req.body
    try {

        let pool = await sql.connect(config)

        const salt = await bcrypt.genSalt(10);
        const newPasswordCode = await bcrypt.hash(newPassword, salt);

        let result = await pool.request()
            .input('email', sql.NVarChar(100), email)
            .input("newPassword", sql.NChar(100), newPasswordCode)
            .input("role", sql.Int, role)
            .execute(process.env.SP_UPDATE_PASSWOR_FORGOT)

        res.status(StatusCodes.CREATED).json({
            message: "successful!",
            data: result.recordset
        })

    } catch (error) {
        res.status(StatusCodes.UNAUTHORIZED).json({ message: error })
    }
}

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body
        const confirmPasswordCode = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;

        let transporter = nodemailer.createTransport({
            // service: "gmail",
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL, // generated ethereal user
                pass: process.env.EMAILPASSWORD, // generated ethereal password
            },
        });
        await transporter.sendMail({
            from: process.env.EMAIL, // sender address
            to: email, // list of receivers
            subject: "Mã xác nhận tạo lại mật khẩu", // Subject line
            text: `Mã xác nhận là: ${confirmPasswordCode}`, // plain text body
        })

        res.status(StatusCodes.OK).json({
            message: "Chúng tôi đã gửi mã về cho bạn",
            data: confirmPasswordCode
        })
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json("Lỗi server!")
    }
}

const getInfoUser = async (req, res) => {

    
    try {
        const { userId, role } = req.user

        let pool = await sql.connect(config)

        let result = await pool.request()
            .input('userid', sql.NVarChar(100), userId)
            .input("role", sql.Int, role)
            .execute(process.env.SP_GET_INFO_USER)

        res.status(StatusCodes.CREATED).json({
            message: "successful!",
            data: result.recordset
        })

    } catch (error) {
        console.log(error)
        res.status(StatusCodes.UNAUTHORIZED).json({ message: error })
    }

}

module.exports = { register, login, changePassword, updatePasswordForgot, forgotPassword, getInfoUser };