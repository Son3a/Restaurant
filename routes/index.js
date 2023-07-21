const tableRouter = require('./tableRoute')
const foodRouter = require('./foodRoute')

function route(app) {
    app.use('/api/v1/table', tableRouter)
    app.use('/api/v1/food',foodRouter)
}

module.exports = route