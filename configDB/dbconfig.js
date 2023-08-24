// const config = {
//     user: "sa",
//     password: "123",
//     server: "127.0.0.1",
//     database: "NHA_HANG",
//     port:"61427",
//     pool: {
//         max: 10,
//         min: 0,
//         idleTimeoutMillis: 30000
//     },
//     options: {
//         encrypt: false, // for azure
//         trustServerCertificate: false // change to true for local dev / self-signed certs
//     }
// }

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
        validateBulkLoadParameters:false,
        encrypt: false,
    }
}

module.exports = config