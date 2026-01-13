const pool = require("./pool");

const getAllItems = async () => {
	const { rows } = await pool.query("SELECT * FROM items;");
	return rows;
};

const getItemById = async (itemId) => {
	const { rows } = await pool.query("SELECT * FROM items WHERE id = $1;", [
		itemId,
	]);

	if (rows.length === 0) return null;
	return rows[0];
};

module.exports = {
	getAllItems,
	getItemById,
};
