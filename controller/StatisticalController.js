var config = require("../configDB/dbconfig")
const sql = require("mssql")
const { StatusCodes } = require('http-status-codes')

const statisticalByDate = async (req, res) => {
    try {
        let { fromDate, toDate } = req.body

        let pool = await sql.connect(config)

        let result = await pool.request()
            .input('fromDate', sql.NChar(20), fromDate)
            .input('toDate', sql.NChar(20), toDate)
            .execute(process.env.SP_STATISTICAL_BY_DATE)

        res.status(StatusCodes.CREATED).json({ data: result.recordset })

    } catch (error) {
        console.log(error);
    }
}

const statisticalByMonth = async (req, res) => {
    try {
        let { year } = req.body

        let pool = await sql.connect(config)

        let result = await pool.request()
            .input('year', sql.NChar(20), year)
            .execute(process.env.SP_STATISTICAL_BY_MONTH)

        res.status(StatusCodes.CREATED).json({ data: result.recordset })

    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    statisticalByDate,
    statisticalByMonth
}