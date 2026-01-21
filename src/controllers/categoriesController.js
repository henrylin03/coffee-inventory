const db = require("../db/queries");

exports.getAllCategories = async (_req, res) => {
	const allCategories = await db.getAllCategories();
	res.render("pages/allCategories", { categories: allCategories });
};

exports.createCategoryGet = async (_req, res) => {
	res.render("pages/newCategory");
};
