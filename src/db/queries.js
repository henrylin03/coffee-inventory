const pool = require("./pool");

const getAllItems = async () => {
	const { rows } = await pool.query("SELECT * FROM items;");
	return rows;
};

module.exports = {
	getAllItems,
};
