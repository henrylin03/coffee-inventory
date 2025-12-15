require("dotenv").config();
const { Pool } = require("pg");
const { DATABASE_NAME } = require("./constants");

module.exports = new Pool({
	host: "localhost",
	user: process.env.USER_NAME,
	database: DATABASE_NAME,
	password: process.env.PASSWORD,
	port: 5432,
});
