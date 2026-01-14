const db = require("../db/queries");
const CustomNotFoundError = require("../errors/CustomNotFoundError");

const getAllItems = async (_req, res) => {
	const allItems = await db.getAllItems();
	res.render("pages/items", { items: allItems });
};

const getItemById = async (req, res) => {
	const { id: itemId } = req.params;
	const item = await db.getItemById(itemId);

	if (item === null)
		throw new CustomNotFoundError(`Item with ID ${itemId} not found`);

	res.render("pages/items/itemDetailsPage", { item });
};

const updateItemPost = async (req, res) => {
	console.log("req.body:", req.body);
	// const { id: itemId } = req.params;
	res.end();
};

module.exports = { getAllItems, getItemById, updateItemPost };
