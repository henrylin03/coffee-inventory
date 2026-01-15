const { validationResult, matchedData } = require("express-validator");
const db = require("../db/queries");
const CustomNotFoundError = require("../errors/CustomNotFoundError");
const { validateItem } = require("./validateItem");

const getAllItems = async (_req, res) => {
	const allItems = await db.getAllItems();
	res.render("pages/allItems", { items: allItems });
};

const getItemById = async (req, res) => {
	const { id: itemId } = req.params;
	const item = await db.getItemById(itemId);

	if (item === null)
		throw new CustomNotFoundError(`Item with ID ${itemId} not found`);

	res.render("pages/editItem", { item });
};

const updateItemPost = [
	validateItem,
	async (req, res) => {
		const { id: itemId } = req.params;

		const errors = validationResult(req);
		if (!errors.isEmpty())
			return res
				.status(400)
				.render("pages/editItem", { errors: errors.array() });

		const { price_dollars, ...unchangedFormInputsAndValues } = matchedData(req);

		const formInputsAndValues = {
			...unchangedFormInputsAndValues,
			price_cents: price_dollars * 100,
		};

		await db.updateItemById(itemId, formInputsAndValues);
		res.redirect("/items");
	},
];

module.exports = { getAllItems, getItemById, updateItemPost };
