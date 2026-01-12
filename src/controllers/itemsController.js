const getAllItems = async (_req, res) => {
	res.render("items.ejs");
};

module.exports = { getAllItems };
