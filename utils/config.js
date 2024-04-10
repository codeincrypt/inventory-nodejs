require('dotenv').config()


require('dotenv').config({path: '.env'});
module.exports = {
    PORT        : process.env.PORT || 4010,
    APP_NAME    : process.env.APP_NAME,
    
    JWT_SECRET  : process.env.JWT_SECRET,

    DB_USER     : process.env.DB_USER,
    DB_PASS     : process.env.DB_PASS,
    DB_NAME     : process.env.DB_NAME,
    DB_HOST     : process.env.DB_HOST,

    APP_BASE_URL: process.env.APP_BASE_URL,
};