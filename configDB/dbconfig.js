const config = {
    user: "sa",
    password: "123",
    server: "127.0.0.1",
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