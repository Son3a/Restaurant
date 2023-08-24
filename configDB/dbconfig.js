const config = {
    user: "sonba7b1_SQLLogin_3",
    password: "vfqh1g5kt7",
    server: "NHA_HANG.mssql.somee.com",
    database: "NHA_HANG",
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: false, // for azure
        trustServerCertificate: false // change to true for local dev / self-signed certs
    }
}

module.exports = config