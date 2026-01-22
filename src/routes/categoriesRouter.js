const { Router } = require("express");
const categoriesController = require("../controllers/categoriesController");

const categoriesRouter = Router();

categoriesRouter.get("/", categoriesController.getAllCategories);

categoriesRouter.get("/new", categoriesController.createCategoryGet);
categoriesRouter.post("/new", categoriesController.createCategoryPost);

module.exports = categoriesRouter;
