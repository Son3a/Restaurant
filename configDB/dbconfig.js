
var config = {
    server: 'NHA_HANG.mssql.somee.com',
    authentication: {
        type: 'default',
        options: {
            userName: 'sonba7b1_SQLLogin_1', // update me
            password: 'biyxt54cc8' // update me
        }
    },
    options: {
        database: 'NHA_HANG',
        validateBulkLoadParameters: false,
        encrypt: false,
        driver: "msnodesqlv8"
    },
}

module.exports = config