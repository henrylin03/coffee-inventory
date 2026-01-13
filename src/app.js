const express = require("express");
const path = require("node:path");
const itemsRouter = require("./routes/itemsRouter");

const app = express();

app.use(express.static(path.join(__dirname, "..", "public")));

/* set up EJS templating */
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

/* middleware to parse data in request body */
app.use(express.urlencoded({ extended: true }));

/* routes */
app.use("/items", itemsRouter);
app.get("/categories", (_req, res) => res.render("pages/categories"));
app.get("/", (_req, res) => res.redirect("/items"));

const PORT = 3000;
app.listen(PORT, (error) => {
	if (error) throw Error;
	console.log(`Listening on port ${PORT}`);
});
