require('dotenv').config();
var config = require("../configDB/dbconfig")
const sql = require("mssql")
const { uid } = require('uid')
const { StatusCodes } = require('http-status-codes')

const getListDepositByClient = async (req, res) => {
    try {
        const { userId, role } = req.user

        let pool = await sql.connect(config)

        let result = await pool.request()
            .input('makh', sql.NChar(11), userId)
            .execute(process.env.SP_GET_DEPOSITS_BY_CLIENT)

        // console.log(result)
        // return result.output.idban
        res.status(StatusCodes.OK).json({ data: result.recordset })
    } catch (error) {
        console.log("error");
    }
}

const getListDepositByBooking = async (req, res) => {
    try {
        const { id } = req.params

        let pool = await sql.connect(config)

        let result = await pool.request()
            .input('mapd', sql.NChar(11), id)
            .execute(process.env.SP_GET_DEPOSIT_BY_BOOKING)

        // console.log(result)
        // return result.output.idban
        res.status(StatusCodes.OK).json({ data: result.recordset })
    } catch (error) {
        console.log("error");
    }
}

const getDepositDetail = async (req, res) => {
    try {
        const { id } = req.params

        let pool = await sql.connect(config)

        let result = await pool.request()
            .input('mapc', sql.NChar(11), id)
            .execute(process.env.SP_GET_DEPOSIT_DETAIL)

        // console.log(result)
        // return result.output.idban
        res.status(StatusCodes.OK).json({ data: result.recordset })
    } catch (error) {
        console.log("error");
    }
}

const confirmDeposit = async (req, res) => {
    try {
        const { idDeposit } = req.body

        const { userId, role } = req.user

        let pool = await sql.connect(config)

        let result = await pool.request()
            .input('mapc', sql.NChar(11), idDeposit)
            .input('manv', sql.NChar(11), userId)
            .execute(process.env.SP_CONFIRM_DEPOSIT)

        console.log(result)

        res.status(StatusCodes.OK).json({ data: result.recordset, msg: "successful" })
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getListDepositByClient,
    getListDepositByBooking,
    getDepositDetail,
    confirmDeposit
}