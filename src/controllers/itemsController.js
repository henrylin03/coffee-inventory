const { validationResult, matchedData } = require("express-validator");
const db = require("../db/queries");
const CustomNotFoundError = require("../errors/CustomNotFoundError");
const { validateItem } = require("./validateItem");
const { formatCurrency } = require("../helpers/formatHelpers");

const getAllItems = async (_req, res) => {
	const fetchedItems = await db.getAllItems();

	const allItems = fetchedItems.map((item) => {
		const { price_cents, ...unchangedFormInputsAndValues } = item;
		return {
			...unchangedFormInputsAndValues,
			price_dollars: formatCurrency(price_cents),
		};
	});

	res.render("pages/allItems", { items: allItems });
};

const createItemGet = async (_req, res) => {
	res.render("pages/newItem");
};

const createItemPost = [
	validateItem,
	async (req, res) => {
		const errors = validationResult(req);
		console.log("errors:", errors);
		if (!errors.isEmpty())
			return res
				.status(400)
				.render("pages/newItem", { errors: errors.array() });

		const { price_dollars, ...unchangedFormInputsAndValues } = matchedData(req);

		const formInputsAndValues = {
			...unchangedFormInputsAndValues,
			price_cents: price_dollars * 100,
		};

		await db.addItem(formInputsAndValues);
		res.redirect("/items");
	},
];

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
		const item = await db.getItemById(itemId);
		if (item === null)
			throw new CustomNotFoundError(`Item with ID ${itemId} not found`);

		const errors = validationResult(req);
		if (!errors.isEmpty())
			return res
				.status(400)
				.render("pages/editItem", { item, errors: errors.array() });

		const { price_dollars, ...unchangedFormInputsAndValues } = matchedData(req);

		const formInputsAndValues = {
			...unchangedFormInputsAndValues,
			price_cents: price_dollars * 100,
		};

		await db.updateItemById(itemId, formInputsAndValues);
		res.redirect("/items");
	},
];

module.exports = {
	createItemGet,
	createItemPost,
	getAllItems,
	getItemById,
	updateItemPost,
};
