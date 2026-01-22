const { validationResult, matchedData } = require("express-validator");
const db = require("../db/queries");
const { validateCategory } = require("../helpers/validation/validateCategory");
const CustomNotFoundError = require("../errors/CustomNotFoundError");

exports.getAllCategories = async (_req, res) => {
	const allCategories = await db.getAllCategories();
	res.render("pages/allCategories", { categories: allCategories });
};

exports.createCategoryGet = async (_req, res) => {
	res.render("pages/newCategory");
};

exports.createCategoryPost = [
	validateCategory,
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty())
			return res
				.status(400)
				.render("pages/newCategory", { errors: errors.array() });

		const formValues = matchedData(req);

		await db.addCategory(formValues);
		res.redirect("/categories");
	},
];

exports.editCategoryGet = async (req, res) => {
	const { id: categoryId } = req.params;
	const category = await db.getCategoryById(categoryId);
	if (category === null)
		throw new CustomNotFoundError(`Category with id ${categoryId} not found`);

	res.render("pages/editCategory", { category });
};
