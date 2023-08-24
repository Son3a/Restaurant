var config = require("../configDB/dbconfig")
const sql = require("mssql")
const { StatusCodes } = require('http-status-codes')

const findTables = async (req, res) => {
    try {
        let { idRoom, status } = req.body

        console.log(req.body);

        if(idRoom == 'all'){
            idRoom = ''
        }

        let pool = await sql.connect(config)

        let result = await pool.request()
            .input('maphong', sql.NChar(11), idRoom)
            .input('trangthai', sql.Int, status)
            .execute(process.env.SP_FIND_TABLES)

        res.status(StatusCodes.CREATED).json({ data: result.recordset })

    } catch (error) {
        console.log(error);
    }
}

const getAllRooms = async (req, res) => {
    try {
        let pool = await sql.connect(config)
        let tables = await pool.request().query('Select * from PHONG')
        res.status(StatusCodes.OK).json({ data: tables.recordset })
    } catch (error) {

    }
}

const getTablesBusy = async (req, res) => {
    try {
        let pool = await sql.connect(config)
        let tables = await pool.request().query('Select * from ' + process.env.V_GET_TABLES_BUSY)
        res.status(StatusCodes.OK).json({ data: tables.recordset })
    } catch (error) {

    }
}

module.exports = {
    findTables,
    getAllRooms,
    getTablesBusy
}