const getAllItems = async (_req, res) => {
	res.render("items.ejs", { items: ["item1", "item2", "item3"] });
};

module.exports = { getAllItems };
