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

const updateItemById = async (itemId, formObject) => {
	const generateUpdateQuery = (formObject) => {
		const resQueryParts = ["UPDATE items SET"];

		const setQueryParts = [];
		Object.keys(formObject).forEach((columnName, idx) => {
			setQueryParts.push(`${columnName} = $${idx + 2}`);
		});

		resQueryParts.push(setQueryParts.join(", "));
		resQueryParts.push(" WHERE id = $1;");

		return resQueryParts.join(" ");
	};

	await pool.query(generateUpdateQuery(formObject), [
		itemId,
		...Object.values(formObject),
	]);
};

module.exports = {
	getAllItems,
	getItemById,
	updateItemById,
};
