const db = require("../db/queries");

const getAllItems = async (_req, res) => {
	const allItems = await db.getAllItems();
	res.render("items.ejs", { items: allItems });
};

module.exports = { getAllItems };
