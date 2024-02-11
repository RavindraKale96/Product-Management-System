module.exports = {
    development: {
        username: process.env.DB_USERNAME || 'postgres' ,
        password: process.env.DB_PASSWORD || 'postgres',
        database: process.env.DB_NAME || "product_db",
        host: process.env.DB_HOST || "localhost",
        dialect: process.env.DB_DIALECT || "postgres"
    }
}