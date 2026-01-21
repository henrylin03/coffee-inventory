const db = require("../db/queries");

exports.getAllCategories = async (_req, res) => {
	const allCategories = await db.getAllCategories();
	res.render("pages/allCategories", { categories: allCategories });
};
