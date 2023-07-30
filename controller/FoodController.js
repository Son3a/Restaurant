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
        let pool = await sql.connect(config)
        let tables = await pool.request().query('Select * from ' + process.env.VIEW_GET_TOP_FOODS)
        res.status(StatusCodes.OK).json({ data: tables.recordsets })
    } catch (error) {
        console.log(error);
    }
}

module.exports = { getPrices, getFoodsByCategory, getTopFoods }