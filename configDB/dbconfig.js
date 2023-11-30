
var config = {
    server: 'NHA_HANG.mssql.somee.com',
    authentication: {
        type: 'default',
        options: {
            userName: 'sonba7b1_SQLLogin_3', // update me
            password: 'vfqh1g5kt7' // update me
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