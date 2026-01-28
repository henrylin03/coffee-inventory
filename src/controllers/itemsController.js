const { validationResult, matchedData } = require("express-validator");
const db = require("../db/queries");
const CustomNotFoundError = require("../errors/CustomNotFoundError");
const { validateItem } = require("../helpers/validation/validateItem");
const { formatCurrency } = require("../helpers/formatHelpers");

const getItemById = async (itemId) => {
	const item = await db.getItemById(itemId);

	if (item === null)
		throw new CustomNotFoundError(`Item with ID ${itemId} not found`);

	return item;
};

exports.getAllItems = async (_req, res) => {
	const fetchedItems = await db.getAllItems();

	const allItems = fetchedItems.map((item) => {
		const { price_cents, ...unchangedFormInputsAndValues } = item;
		return {
			...unchangedFormInputsAndValues,
			price_dollars: formatCurrency(price_cents),
		};
	});

	res.render("pages/allItems", { title: "All items", items: allItems });
};

exports.createItemGet = async (req, res) => {
	const { referredCategoryId } = req.query ?? null;

	const formRoute = referredCategoryId
		? `/items/new?referredCategoryId=${referredCategoryId}`
		: "/items/new";

	res.render("pages/newItem", { title: "Create new item", formRoute });
};

exports.createItemPost = [
	validateItem,
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty())
			return res
				.status(400)
				.render("pages/newItem", { errors: errors.array() });

		const { referredCategoryId } = req.query;

		const { price_dollars, ...unchangedFormInputsAndValues } = matchedData(req);
		const formInputsAndValues = {
			...unchangedFormInputsAndValues,
			price_cents: price_dollars * 100,
			category_id: referredCategoryId,
		};

		await db.addItem(formInputsAndValues);

		if (referredCategoryId) res.redirect(`/categories/${referredCategoryId}`);
		else res.redirect("/items");
	},
];

exports.editItemGet = async (req, res) => {
	const { id: itemId } = req.params;
	const fetchedItem = await getItemById(itemId);

	res.render("pages/editItem", { title: fetchedItem.name, item: fetchedItem });
};

exports.editItemPost = [
	validateItem,
	async (req, res) => {
		const { id: itemId } = req.params;
		const fetchedItem = await getItemById(itemId);

		const errors = validationResult(req);
		if (!errors.isEmpty())
			return res.status(400).render("pages/editItem", {
				item: fetchedItem,
				errors: errors.array(),
			});

		const { price_dollars, ...unchangedFormInputsAndValues } = matchedData(req);

		const formInputsAndValues = {
			...unchangedFormInputsAndValues,
			price_cents: price_dollars * 100,
		};

		await db.updateItemById(itemId, formInputsAndValues);
		res.redirect("/items");
	},
];

exports.deleteItemPost = async (req, res) => {
	const { id: itemId } = req.params;
	await db.deleteItem(itemId);
	res.redirect("/items");
};
