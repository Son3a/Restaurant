var config = require("../configDB/dbconfig")
const sql = require("mssql")
const { StatusCodes } = require('http-status-codes')

const getTable = async (req, res) => {
    try {
        let pool = await sql.connect(config)
        let tables = await pool.request().query('Select * from BAN')
        res.status(StatusCodes.OK).json({ data: tables.recordsets })
    } catch (error) {

    }
}

module.exports = {
    getTable
}