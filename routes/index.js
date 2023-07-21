const tableRouter = require('./tableRoute')
const foodRouter = require('./foodRoute')
const categoryRouter = require('./categoryRoute')

function route(app) {
    app.use('/api/v1/table', tableRouter)
    app.use('/api/v1/food',foodRouter)
    app.use('/api/v1/category',categoryRouter)
}

module.exports = route