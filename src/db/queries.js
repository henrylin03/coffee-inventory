const pool = require("./pool");

const getAllItems = async () => {
	const { rows } = await pool.query("SELECT * FROM items ORDER BY id ASC;");
	return rows;
};

const getItemById = async (itemId) => {
	const { rows } = await pool.query("SELECT * FROM items WHERE id = $1;", [
		itemId,
	]);

	if (rows.length === 0) return null;
	return rows[0];
};

const addItem = async (formObject) => {
	const {
		name,
		sku,
		roastery,
		description,
		size_grams,
		stock_quantity,
		price_cents,
	} = formObject;

	await pool.query(
		"INSERT INTO items (name, sku, size_grams, roastery, description, price_cents, stock_quantity) VALUES ($1, $2, $3, $4, $5, $6, $7)",
		[name, sku, size_grams, roastery, description, price_cents, stock_quantity],
	);
};

const updateItemById = async (itemId, formObject) => {
	const generateUpdateQuery = (formObject) => {
		const resQueryParts = ["UPDATE items SET"];

		const setQueryParts = [];
		Object.keys(formObject).forEach((columnName, idx) => {
			setQueryParts.push(`${columnName} = $${idx + 2}`); // first parameter is itemId
		});

		resQueryParts.push(setQueryParts.join(", "));
		resQueryParts.push(" WHERE id = $1;"); // first parameter is itemId

		return resQueryParts.join(" ");
	};

	await pool.query(generateUpdateQuery(formObject), [
		itemId,
		...Object.values(formObject),
	]);
};

const deleteItem = async (itemId) => {
	await pool.query("DELETE FROM items WHERE id = $1", [itemId]);
};

const getAllCategories = async () => {
	const { rows } = await pool.query(
		"SELECT * FROM categories ORDER BY id ASC;",
	);
	return rows;
};

const addCategory = async (formObject) => {
	const { name, description } = formObject;
	await pool.query(
		"INSERT INTO categories (name, description) VALUES ($1, $2)",
		[name, description],
	);
};

const getCategoryById = async (categoryId) => {
	const { rows } = await pool.query("SELECT * FROM categories WHERE id = $1;", [
		categoryId,
	]);

	if (rows.length === 0) return null;
	return rows[0];
};

const getItemsInCategory = async (categoryId) => {
	const { rows } = await pool.query(
		"SELECT * FROM items WHERE category_id = $1;",
		[categoryId],
	);

	return rows;
};

module.exports = {
	addCategory,
	addItem,
	deleteItem,
	getAllCategories,
	getAllItems,
	getCategoryById,
	getItemById,
	getItemsInCategory,
	updateItemById,
};
