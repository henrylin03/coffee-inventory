const db = require("../db/queries");

const getAllItems = async (_req, res) => {
	const allItems = await db.getAllItems();
	res.render("pages/items", { items: allItems });
};

module.exports = { getAllItems };
