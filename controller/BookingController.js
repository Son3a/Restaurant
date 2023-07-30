require('dotenv').config();
var config = require("../configDB/dbconfig")
const sql = require("mssql")
const { uid } = require('uid')
const { StatusCodes } = require('http-status-codes')

const getTablesToBooking = async (req, res) => {
    try {
        const { time, amountPeople } = req.body

        console.log(time);

        let pool = await sql.connect(config)


        let result = await pool.request()
            .input('time', sql.NChar(20), time)
            .input("so_nguoi", sql.Int, amountPeople)
            .execute(process.env.SP_GET_TABLES_TO_BOOKING)

        // console.log(result)
        // return result.output.idban
        res.status(StatusCodes.OK).json({ data: result.recordset })
    } catch (error) {
        console.log("error");
    }
}

const bookingTable = async (req, res) => {
    try {
        const { amountPeople, timeBooking, status, note, idClient, idTable } = req.body

        let pool = await sql.connect(config)
        const idBooking = uid(11)
        // console.log(req.body);
        let booking = await pool.request()
            .input('mapd', sql.NChar(11), idBooking)
            .input("songuoi", sql.Int, amountPeople)
            .input('trangthai', sql.NVarChar(20), status)
            .input("ngaydat", sql.NChar(20), timeBooking)
            .input("ghichu", sql.Text, note)
            .input("makh", sql.NChar(11), idClient)
            .input('maban', sql.NChar(11), String(idTable).trim())
            .execute(process.env.SP_BOOKING_TABLE)

        res.status(StatusCodes.CREATED).json({
            message: "successful!",
            data: {
                mapd: idBooking
            }
        })

    } catch (error) {
        console.log(error);
    }
}

const bookingTableAndDeposit = async (req, res) => {
    try {
        const { amountPeople, timeBooking, note, idClient, idTable, typePay, moneyDeposit } = req.body

        let pool = await sql.connect(config)
        const idBooking = uid(11)
        const idDeposit = uid(11)
        // console.log(req.body);
        let booking = await pool.request()
            .input('mapd', sql.NChar(11), idBooking)
            .input("songuoi", sql.Int, amountPeople)
            .input("ngaydat", sql.NChar(20), timeBooking)
            .input("ghichu", sql.Text, note)
            .input("makh", sql.NChar(11), idClient)
            .input('maban', sql.NChar(11), String(idTable).trim())
            .input("mapc", sql.NChar(11), idDeposit)
            .input("ht_thanhtoan", sql.NVarChar(20), typePay)
            .input('giacoc', sql.Numeric, moneyDeposit)
            .execute(process.env.SP_BOOKING_AND_DEPOSIT)

        res.status(StatusCodes.CREATED).json({
            message: "successful!",
            data: {
                mapd: idBooking,
                mapc: idDeposit
            }
        })

    } catch (error) {
        console.log(error);
    }
}

const bookingFood = async (req, res) => {
    try {
        const { listFood } = req.body

        console.log(listFood);
        let pool = await sql.connect(config)

        Object.entries(listFood).forEach(async ([key, val]) => {
            let booking = await pool.request()
                .input('mapd', sql.NChar(11), val.idBooking)
                .input("maban", sql.NChar(11), val.idTable)
                .input('mama', sql.NChar(11), val.idFood)
                .input("soluong", sql.Int, val.amountFood)
                .execute(process.env.SP_BOOKING_FOOD)
        });



        res.status(StatusCodes.CREATED).json({ data: listFood })

    } catch (error) {
        console.log(error);
    }
}


const deposit = async (req, res) => {
    try {
        const { typePay, moneyDeposit, idBooking, idClient } = req.body

        let pool = await sql.connect(config)

        const idDeposit = uid(11)
        let deposit = await pool.request()
            .input('mapc', sql.NChar(11), idDeposit)
            .input("ht_thanhtoan", sql.NVarChar(20), typePay)
            .input('giacoc', sql.Numeric, moneyDeposit)
            .input("mapd", sql.NChar(11), idBooking)
            .input("makh", sql.NChar(11), idClient)
            .execute(process.env.SP_DEPOSIT)

        res.status(StatusCodes.CREATED).json({
            message: "successful!",
            data: {
                mapc: idDeposit
            }
        })
    } catch (error) {
        console.log(error);
    }
}

const getBookingHistoryByClient = async (req, res) => {
    try {
        const idClient = req.params.id

        let pool = await sql.connect(config)

        let result = await pool.request()
            .input("makh", sql.NChar(11), idClient)
            .execute(process.env.SP_GET_ALL_BOOKING_HISTORY)

        res.status(StatusCodes.CREATED).json({
            message: "successful!",
            data: result.recordsets
        })
    } catch (error) {
        console.log(error);
    }
}

const getBookingHistory = async (req, res) => {
    try {
        const { idClient, idBooking } = req.body

        let pool = await sql.connect(config)

        let result = await pool.request()
            .input("makh", sql.NChar(11), idClient)
            .input("mapd", sql.NChar(11), idBooking)
            .execute(process.env.SP_GET_BOOKING_HISTORY)

        res.status(StatusCodes.CREATED).json({
            message: "successful!",
            data: result.recordsets
        })
    } catch (error) {
        console.log(error);
    }
}

module.exports = { getTablesToBooking, bookingTable, deposit, bookingFood, bookingTableAndDeposit, getBookingHistoryByClient,getBookingHistory }