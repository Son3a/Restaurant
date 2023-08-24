const tableRouter = require('./tableRoute')
const foodRouter = require('./foodRoute')
const categoryRouter = require('./categoryRoute')
const bookingRouter = require('./bookingRoute')
const depositRouter = require('./depositRoute')
const authRouter = require('./authRoute')
const statisticalRouter = require('./statisticalRoute')
const billRouter = require('./billRoute')

function route(app) {
    app.use('/api/v1/table', tableRouter)
    app.use('/api/v1/food', foodRouter)
    app.use('/api/v1/category', categoryRouter)
    app.use('/api/v1/booking', bookingRouter)
    app.use('/api/v1/deposit', depositRouter)
    app.use('/api/v1/auth', authRouter)
    app.use('/api/v1/statistical', statisticalRouter)
    app.use('/api/v1/bill', billRouter)
}

module.exports = route