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
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
}

const bookingTable = async (req, res) => {
    try {
        const { amountPeople, timeBooking, note, idTables } = req.body

        let { userId, role } = req.user

        if (role == 2) {
            userId = null
        }

        console.log(req.body);

        let pool = await sql.connect(config)
        const idBooking = uid(11)
        let booking = await pool.request()
            .input('mapd', sql.NChar(11), idBooking)
            .input("songuoi", sql.Int, amountPeople)
            .input("ngaydat", sql.NChar(20), timeBooking)
            .input("ghichu", sql.Text, note)
            .input("makh", sql.NChar(11), userId)
            .execute(process.env.SP_BOOKING_TABLE)

        console.log("check");

        Object.entries(idTables).forEach(async ([key, val]) => {

            if (val != null) {
                console.log('val: ', val);
                let bookingDetail = await pool.request()
                    .input('mapd', sql.NChar(11), idBooking)
                    .input("maban", sql.NChar(11), val)
                    .execute(process.env.SP_CREATE_BOOKING_DETAIL)
            }
        });

        res.status(StatusCodes.CREATED).json({
            message: "successful!",
            data: {
                mapd: idBooking
            }
        })

    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
}

const bookingTableAndDeposit = async (req, res) => {
    try {
        const { amountPeople, timeBooking, note, idTables, typePay, moneyDeposit } = req.body

        const { userId, role } = req.user

        let pool = await sql.connect(config)
        const idBooking = uid(11)
        const idDeposit = uid(11)
        // console.log(req.body);
        let booking = await pool.request()
            .input('mapd', sql.NChar(11), idBooking)
            .input("songuoi", sql.Int, amountPeople)
            .input("ngaydat", sql.NChar(20), timeBooking)
            .input("ghichu", sql.Text, note)
            .input("makh", sql.NChar(11), userId)
            .input("mapc", sql.NChar(11), idDeposit)
            .input("ht_thanhtoan", sql.NVarChar(20), typePay)
            .input('giacoc', sql.Numeric, moneyDeposit)
            .execute(process.env.SP_BOOKING_AND_DEPOSIT)

        console.log(idTables);
        Object.entries(idTables).forEach(async ([key, val]) => {
            console.log(val);
            let bookingDetail = await pool.request()
                .input('mapd', sql.NChar(11), idBooking)
                .input("maban", sql.NChar(11), val)
                .execute(process.env.SP_CREATE_BOOKING_DETAIL)
        });

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
                .input("gia", sql.Numeric, val.price)
                .execute(process.env.SP_BOOKING_FOOD)
        });

        res.status(StatusCodes.CREATED).json({ data: listFood })

    } catch (error) {
        console.log(error);
    }
}


const deposit = async (req, res) => {
    try {
        const { typePay, moneyDeposit, idBooking } = req.body

        const { userId, role } = req.user

        let pool = await sql.connect(config)

        const idDeposit = uid(11)
        let deposit = await pool.request()
            .input('mapc', sql.NChar(11), idDeposit)
            .input("ht_thanhtoan", sql.NVarChar(20), typePay)
            .input('giacoc', sql.Numeric, moneyDeposit)
            .input("mapd", sql.NChar(11), idBooking)
            .input("makh", sql.NChar(11), userId)
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
        let pool = await sql.connect(config)

        const { userId, role } = req.user

        let result = await pool.request()
            .input("makh", sql.NChar(11), userId)
            .execute(process.env.SP_GET_ALL_BOOKING_HISTORY)

        res.status(StatusCodes.CREATED).json({
            message: "successful!",
            data: result.recordsets
        })
    } catch (error) {
        res.status(StatusCodes.UNAUTHORIZED).json({ message: error })
    }
}

const getBookingHistory = async (req, res) => {
    try {
        const { idBooking } = req.body

        const { userId, role } = req.user

        let pool = await sql.connect(config)

        let result = await pool.request()
            .input("makh", sql.NChar(11), userId)
            .input("mapd", sql.NChar(11), idBooking)
            .execute(process.env.SP_GET_BOOKING_HISTORY)

        res.status(StatusCodes.CREATED).json({
            message: "successful!",
            data: result.recordsets
        })
    } catch (error) {
        res.status(StatusCodes.UNAUTHORIZED).json({ message: error })
    }
}

const getBookingNow = async (req, res) => {
    try {

        const { userId, role } = req.user

        let pool = await sql.connect(config)

        let result = await pool.request()
            .input("makh", sql.NChar(11), userId)
            .execute(process.env.SP_GET_BOOKING_NOW)

        res.status(StatusCodes.CREATED).json({
            message: "successful!",
            data: result.recordset
        })
    } catch (error) {
        console.log(error);
    }
}

const getAllBookings = async (req, res) => {
    try {
        let pool = await sql.connect(config)
        let result = await pool.request().query('Select * from ' + process.env.V_GET_ALL_BOOKINGS)
        res.status(StatusCodes.OK).json({ data: result.recordset })
    } catch (error) {
        console.log(error);
    }
}

const getBookingInCurrentDay = async (req, res) => {
    try {
        let { id } = req.body

        if (id == 'all') {
            id = ''
        }
        let pool = await sql.connect(config)
        let result = await pool.request()
            .input("trangthai", sql.NVarChar(20), id)
            .execute(process.env.SP_GET_BOOKINGS_IN_CURRENT_DAY)

        res.status(StatusCodes.CREATED).json({
            message: "successful!",
            data: result.recordset
        })
    } catch (error) {
        console.log(error);
    }
}

const getBookingsByStatus = async (req, res) => {
    try {
        const { id } = req.params

        let pool = await sql.connect(config)

        let result = await pool.request()
            .input("trangthai", sql.NVarChar(20), id)
            .execute(process.env.SP_GET_BOOKINGS_BY_STATUS)

        res.status(StatusCodes.CREATED).json({
            message: "successful!",
            data: result.recordset
        })
    } catch (error) {
        console.log(error);
    }
}

const getBookingDetail = async (req, res) => {
    try {
        const { id } = req.params

        let pool = await sql.connect(config)

        let result = await pool.request()
            .input("mapd", sql.NVarChar(20), id)
            .execute(process.env.SP_BOOKING_DETAIL)

        res.status(StatusCodes.CREATED).json({
            message: "successful!",
            data: result.recordsets
        })
    } catch (error) {
        console.log(error);
    }
}

const confirmBooking = async (req, res) => {
    try {
        const { idBooking, status } = req.body

        const { userId, role } = req.user

        let pool = await sql.connect(config)

        let result = await pool.request()
            .input('mapd', sql.NChar(11), idBooking)
            .input('trangthai', sql.NVarChar(20), status)
            .input('manv', sql.NChar(11), userId)
            .execute(process.env.SP_CONFIRM_BOOKING)

        console.log(result)

        res.status(StatusCodes.OK).json({ data: result.recordset, msg: "successful" })
    } catch (error) {
        console.log("error");
    }
}

const cancelBooking = async (req, res) => {
    try {
        const { idBooking } = req.body

        let pool = await sql.connect(config)

        const { userId, role } = req.user

        let result = await pool.request()
            .input('mapd', sql.NChar(11), idBooking)
            .input('manv', sql.NChar(11), userId)
            .input('role', sql.Int, role)
            .execute(process.env.SP_CANCEL_BOOKING)

        console.log(result)

        res.status(StatusCodes.OK).json({ data: result.recordset, msg: "successful" })
    } catch (error) {
        console.log(error)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error })
    }
}

const updateNumOfFoodBooking = async (req, res) => {
    try {
        const { idBooking, idFood, numOfFood } = req.body

        let pool = await sql.connect(config)

        let result = await pool.request()
            .input('soluong', sql.Int, numOfFood)
            .input('mapd', sql.NChar(11), idBooking)
            .input('mama', sql.NChar(11), idFood)
            .execute(process.env.SP_UPDATE_NUM_FOOD_BOOKING)

        res.status(StatusCodes.OK).json({ data: result.recordset, msg: "successful" })
    } catch (error) {
        console.log(error);
    }
}

const updateNumOfFoodBookingUser = async (req, res) => {
    try {
        const { idBooking, listFoodChange } = req.body

        //console.log(listFoodChange);
        let pool = await sql.connect(config)

        Object.entries(listFoodChange).forEach(async ([key, val]) => {

            if (val != null) {
                console.log('val: ', val.idFood);
                let result = await pool.request()
                    .input('soluong', sql.Int, val.numOfFood)
                    .input('mapd', sql.NChar(11), idBooking)
                    .input('mama', sql.NChar(11), val.idFood)
                    .execute(process.env.SP_UPDATE_NUM_FOOD_BOOKING)
            }
        });

        res.status(StatusCodes.OK).json({ msg: "successful" })
    } catch (error) {
        console.log("error");
    }
}

const addFoodToBooking = async (req, res) => {
    try {
        const { idBooking, idFood, idTable, price, numOfFood } = req.body

        let pool = await sql.connect(config)

        let result = await pool.request()
            .input('mapd', sql.NChar(11), idBooking)
            .input('mama', sql.NChar(11), idFood)
            .input('maban', sql.NChar(11), idTable)
            .input('gia', sql.Numeric, price)
            .input('soluong', sql.Int, numOfFood)
            .execute(process.env.SP_ADD_FOOD_TO_BOOKING)

        res.status(StatusCodes.OK).json({ data: result.recordset, msg: "successful" })
    } catch (error) {
        console.log(error);
    }
}

const addFoodsToBooking = async (req, res) => {
    try {
        const { idBooking, idTable, listFoodAdd } = req.body

        let pool = await sql.connect(config)

        console.log(req.body);

        Object.entries(listFoodAdd).forEach(async ([key, val]) => {

            if (val != null) {
                let result = await pool.request()
                    .input('mapd', sql.NChar(11), idBooking)
                    .input('mama', sql.NChar(11), val.idFood)
                    .input('maban', sql.NChar(11), idTable)
                    .input('gia', sql.Numeric, val.price)
                    .input('soluong', sql.Int, val.numOfFood)
                    .execute(process.env.SP_ADD_FOOD_TO_BOOKING)
            }
        });

        res.status(StatusCodes.OK).json({ msg: "successful" })
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.BAD_REQUEST).json({ error })
    }
}

const deleteFoodToBooking = async (req, res) => {
    try {
        const { idBooking, idFood } = req.body

        console.log(req.body)

        let pool = await sql.connect(config)

        let result = await pool.request()
            .input('mapd', sql.NChar(11), idBooking)
            .input('mama', sql.NChar(11), idFood)

            .execute(process.env.SP_DELETE_FOOD_TO_BOOKING)

        res.status(StatusCodes.OK).json({ data: result.recordset, msg: "successful" })
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getTablesToBooking,
    bookingTable,
    deposit,
    bookingFood,
    bookingTableAndDeposit,
    getBookingHistoryByClient,
    getBookingHistory,
    getBookingNow,
    getAllBookings,
    getBookingsByStatus,
    getBookingDetail,
    confirmBooking,
    cancelBooking,
    updateNumOfFoodBooking,
    updateNumOfFoodBookingUser,
    getBookingInCurrentDay,
    addFoodToBooking,
    deleteFoodToBooking,
    addFoodsToBooking
}