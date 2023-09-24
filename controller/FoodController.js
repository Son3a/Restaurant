require('dotenv').config();
var config = require("../configDB/dbconfig")
const sql = require("mssql")
const { StatusCodes } = require('http-status-codes')

const getPrices = async (req, res) => {
    try {
        let pool = await sql.connect(config)
        let tables = await pool.request().query('Select * from ' + process.env.VIEW_GET_PRICE)
        res.status(StatusCodes.OK).json({ data: tables.recordsets })
    } catch (error) {
        console.log(error);
    }
}

const getFoodsByCategory = async (req, res) => {
    try {
        const idCategory = req.params.id
        let pool = await sql.connect(config)

        let result = await pool.request()
            .input('maloai', sql.NChar(11), idCategory)
            .execute(process.env.SP_GET_FOODS_BY_CATEGORY)

        res.status(StatusCodes.OK).json({ data: result.recordsets })
    } catch (error) {
        console.log(error);
    }
}

const getTopFoods = async (req, res) => {
    try {
        const { id } = req.params

        let pool = await sql.connect(config)

        let result = await pool.request()
            .input('num_of_day', sql.NChar(11), id)
            .execute(process.env.SP_GET_TOP_FOOD)

        res.status(StatusCodes.CREATED).json({ data: result.recordset })

    } catch (error) {
        console.log(error);
    }
}

const getFoodByBooking = async (req, res) => {
    try {
        const { idBooking } = req.body

        let pool = await sql.connect(config)

        let result = await pool.request()
            .input('mapd', sql.NChar(11), idBooking)
            .execute(process.env.SP_GET_FOOD_BOOKING)

        res.status(StatusCodes.CREATED).json({ data: result.recordset })

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error })
    }
}

const getFoodSaleOff = async (req, res) => {
    try {
        let pool = await sql.connect(config)
        let tables = await pool.request().query('Select * from ' + process.env.V_FODDS_SALE_OFF)
        res.status(StatusCodes.OK).json({ data: tables.recordset })
    } catch (error) {
        console.log(error);
    }
}

const getPriceFoodsWithSaleOff = async (req, res) => {
    try {
        let pool = await sql.connect(config)
        let tables = await pool.request().query('Select * from ' + process.env.V_PRICE_FOODS_WITH_SALE_OFF)
        res.status(StatusCodes.OK).json({ data: tables.recordset })
    } catch (error) {
        console.log(error);
    }
}

const updatePriceFood = async (req, res) => {
    try {
        const { idFood, price } = req.body

        const { userId, role } = req.user

        let pool = await sql.connect(config)

        let result = await pool.request()
            .input('manv', sql.NChar(11), userId)
            .input('mama', sql.NChar(11), idFood)
            .input('gia', sql.Numeric, price)
            .execute(process.env.SP_UPDATE_PRICE_FOOD)

        res.status(StatusCodes.CREATED).json({ data: result.recordset })

    } catch (error) {
        console.log(error);
    }
}

const getBookingAndFood = async (req, res) => {
    try {
        const { id } = req.params

        let pool = await sql.connect(config)

        let result = await pool.request()
            .input('mapd', sql.NChar(11), id)
            .execute(process.env.SP_GET_BOOKING_AND_FOOD)

        res.status(StatusCodes.CREATED).json({ data: result.recordsets })

    } catch (error) {
        console.log(error);
    }
}

const findFood = async (req, res) => {
    try {
        const { data } = req.body

        let pool = await sql.connect(config)

        let result = await pool.request()
            .input('data', sql.NVarChar(50), data)
            .execute(process.env.SP_FIND_FOOD)

        res.status(StatusCodes.CREATED).json({ data: result.recordset })

    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getPrices,
    getFoodsByCategory,
    getTopFoods,
    getFoodByBooking,
    getFoodSaleOff,
    getPriceFoodsWithSaleOff,
    updatePriceFood,
    getBookingAndFood,
    findFood
}