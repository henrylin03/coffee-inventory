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

// const getRoutes = async (referredCategoryId) => {
// 	const routes = {};

// 	routes.formSubmitRoute = referredCategoryId
// 		? `/items/new?referredCategoryId=${referredCategoryId}`
// 		: "/items/new";

// 	routes.redirectRoute = referredCategoryId
// 		? `/categories/${referredCategoryId}` // TODO: THIS NEEDS TO BE FIXED - NEEDS TO GO TO THE MANAGE ITEMS PAGE
// 		: "/items";

// 	return routes;
// };

const getEditItemButtonRoute = (categoryIdQueryValue, fromPageQueryValue) => {
	if (!categoryIdQueryValue) return "/items";
	if (fromPageQueryValue === "category")
		return `/categories/${categoryIdQueryValue}`;
	else return `/categories/${categoryIdQueryValue}/edit-items`;
};

// const getRoutes = (req, basePath, allItemsPath = "/items") => {
//   const { referredCategoryId, fromPage } = req.query;
//   const routes = { formSubmitRoute: "/", redirectRoute: allItemsPath };

//   if
// };

const getPathsForNewItemPage = (req) => {
	const { referredCategoryId } = req.query;
	const paths = { submit: "/items/new", previousPage: "/items" };
	if (referredCategoryId) {
		paths.submit = `/items/new?referredCategoryId=${referredCategoryId}`;
		paths.previousPage = `/categories/${referredCategoryId}/edit-items`;
	}

	return paths;
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
	const paths = getPathsForNewItemPage(req);

	res.render("pages/newItem", {
		title: "Create new item",
		paths,
	});
};

exports.createItemPost = [
	validateItem,
	async (req, res) => {
		const { referredCategoryId } = req.query;
		const paths = getPathsForNewItemPage(req);

		const errors = validationResult(req);
		if (!errors.isEmpty())
			return res
				.status(400)
				.render("pages/newItem", { errors: errors.array(), paths });

		const { price_dollars, ...unchangedFormInputsAndValues } = matchedData(req);
		const formInputsAndValues = {
			...unchangedFormInputsAndValues,
			price_cents: price_dollars * 100,
			category_id: referredCategoryId,
		};

		await db.addItem(formInputsAndValues);
		res.redirect(paths.previousPage);
	},
];

exports.editItemGet = async (req, res) => {
	const { referredCategoryId, fromPage } = req.query;
	const { id: itemId } = req.params;
	const fetchedItem = await getItemById(itemId);

	res.render("pages/editItem", {
		title: fetchedItem.name,
		item: fetchedItem,
		buttonRoutes: {
			formSubmitRoute: !referredCategoryId
				? `/items/${itemId}/update`
				: `/items/${itemId}/update?referredCategoryId=${referredCategoryId}&fromPage=${fromPage}`,
			cancelBtn: getEditItemButtonRoute(referredCategoryId, fromPage),
		},
	});
};

exports.editItemPost = [
	validateItem,
	async (req, res) => {
		const { referredCategoryId, fromPage } = req.query;
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
		res.redirect(getEditItemButtonRoute(referredCategoryId, fromPage));
	},
];

exports.deleteItemPost = async (req, res) => {
	const { id: itemId } = req.params;
	await db.deleteItem(itemId);
	res.redirect("/items");
};
