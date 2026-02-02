const { Router } = require("express");
const categoriesController = require("../controllers/categoriesController");

const categoriesRouter = Router();

categoriesRouter.get("/", categoriesController.getAllCategories);

categoriesRouter.get("/new", categoriesController.createCategoryGet);
categoriesRouter.post("/new", categoriesController.createCategoryPost);

categoriesRouter.get(
	"/includeItems",
	categoriesController.editItemsInCategoryGet,
);

categoriesRouter.get("/:id", categoriesController.editCategoryGet);
categoriesRouter.post("/:id/update", categoriesController.editCategoryPost);

categoriesRouter.post("/:id/delete", categoriesController.deleteCategoryPost);

module.exports = categoriesRouter;
