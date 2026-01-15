const { body } = require("express-validator");

const CHARACTER_LIMITS = {
	name: { min: 1, max: 100 },
	sku: { min: 1, max: 24 },
	roastery: { min: 1, max: 100 },
	description: { min: 0, max: 4000 },
};

const getLengthErrorMessage = (fieldName, minCharacters, maxCharacters) => {
	const isOptionalField = minCharacters === 0;
	if (isOptionalField)
		return `${fieldName} must be at most ${maxCharacters} characters`;

	return `${fieldName} must be between ${minCharacters} and ${maxCharacters} characters`;
};

const alphanumericErrorMessage =
	"must only contain letters, numbers, hyphens (-) or underscores (_)";

const validateItem = [
	body("name")
		.trim()
		.isLength({
			min: CHARACTER_LIMITS.name.min,
			max: CHARACTER_LIMITS.name.max,
		})
		.withMessage(
			getLengthErrorMessage(
				"Name",
				CHARACTER_LIMITS.name.min,
				CHARACTER_LIMITS.name.max,
			),
		),

	body("sku")
		.trim()
		.isAlphanumeric("en-AU", { ignore: "-_" })
		.withMessage(`SKU ${alphanumericErrorMessage}`)
		.isLength({ min: CHARACTER_LIMITS.sku.min, max: CHARACTER_LIMITS.sku.max })
		.withMessage(
			getLengthErrorMessage(
				"SKU",
				CHARACTER_LIMITS.sku.min,
				CHARACTER_LIMITS.sku.max,
			),
		),

	body("roastery")
		.trim()
		.isLength({
			min: CHARACTER_LIMITS.roastery.min,
			max: CHARACTER_LIMITS.roastery.max,
		})
		.withMessage(
			getLengthErrorMessage(
				"Roastery",
				CHARACTER_LIMITS.roastery.min,
				CHARACTER_LIMITS.roastery.max,
			),
		),

	body("description")
		.trim()
		.isLength({ max: CHARACTER_LIMITS.description.max })
		.withMessage(
			getLengthErrorMessage(
				"Description",
				CHARACTER_LIMITS.description.min,
				CHARACTER_LIMITS.description.max,
			),
		)
		.optional(),

	body("size_grams")
		.isFloat({ min: 0.1 })
		.withMessage(
			"Weight of each unit must be a positive number, greater than 0.1 grams",
		),

	body("price_cents")
		.isFloat({ min: 0 })
		.withMessage(
			"Selling price of each unit must be a positive number or zero.",
		),

	body("stock_quantity")
		.isInt({ min: 0 })
		.withMessage("Stock quantity must be a non-negative integer."),
];

module.exports = { validateItem };
