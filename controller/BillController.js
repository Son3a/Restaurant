require('dotenv').config();
var config = require("../configDB/dbconfig")
const sql = require("mssql")
const { StatusCodes } = require('http-status-codes')
const { uid } = require('uid')

const createBill = async (req, res) => {
    try {
        const { idClient, idBooking, idTable, status } = req.body

        let pool = await sql.connect(config)

        const { userId, role } = req.user

        const idBill = uid(11)
        let result = await pool.request()
            .input('mahd', sql.NChar(11), idBill)
            .input('makh', sql.NChar(11), idClient)
            .input('manv', sql.NChar(11), userId)
            .input('mapd', sql.NChar(11), idBooking)
            .input('maban', sql.NChar(11), idTable)
            .input('trangthai', sql.NVarChar(20), status)


            .execute(process.env.SP_CREATE_BILL)

        res.status(StatusCodes.OK).json({ data: result.recordset, msg: "successful" })
    } catch (error) {
        console.log(error);
    }
}

const getFoodsToPay = async (req, res) => {
    try {
        const { idBooking } = req.body

        let pool = await sql.connect(config)

        const { userId, role } = req.user

        let result = await pool.request()
            .input('mapd', sql.NChar(11), idBooking)
            .execute(process.env.SP_GET_INFO_BILL)

        res.status(StatusCodes.OK).json({ data: result.recordsets, msg: "successful" })
    } catch (error) {
        console.log(error);
    }
}

module.exports = { createBill, getFoodsToPay }