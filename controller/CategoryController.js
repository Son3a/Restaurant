require('dotenv').config();
var config = require("../configDB/dbconfig")
const sql = require("mssql")
const { StatusCodes } = require('http-status-codes')

const getCategories = async (req, res) => {
    try {
        let pool = await sql.connect(config)
        let tables = await pool.request().query('Select * from loai_mon')
        res.status(StatusCodes.OK).json({ data: tables.recordsets })
    } catch (error) {

    }
}

module.exports = { getCategories }