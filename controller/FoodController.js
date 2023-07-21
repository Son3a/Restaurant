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

    }
}

module.exports = { getPrices }