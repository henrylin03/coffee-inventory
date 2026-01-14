const { body } = require("express-validator");

const CHARACTER_LIMITS = {
	name: { min: 1, max: 100 },
	sku: { min: 1, max: 24 },
	description: { min: 0, max: 4000 },
};

const getLengthErrorMessage = (fieldName, minCharacters, maxCharacters) =>
	`${fieldName} must be between ${minCharacters} and ${maxCharacters} characters`;

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
		.isAlphanumeric("en-AU", { ignore: ["-", "_"] })
		.withMessage(`SKU ${alphanumericErrorMessage}`)
		.isLength({ min: CHARACTER_LIMITS.sku.min, max: CHARACTER_LIMITS.sku.max })
		.withMessage(
			getLengthErrorMessage(
				"SKU",
				CHARACTER_LIMITS.sku.min,
				CHARACTER_LIMITS.sku.max,
			),
		),
];

module.exports = { validateItem };
