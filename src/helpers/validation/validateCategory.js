const { body } = require("express-validator");
const { getLengthErrorMessage } = require("./helpers");

const CHARACTER_LIMITS = {
    name: { min: 1, max: 100 },
    description: { min: 0, max: 4000 },
};

const validateCategory = [
    body("name")
        .trim()
        .isLength({
            min: CHARACTER_LIMITS.name.min,
            max: CHARACTER_LIMITS.name.max,
        })
        .withMessage(
            getLengthErrorMessage(
                "Category name",
                CHARACTER_LIMITS.name.min,
                CHARACTER_LIMITS.name.max,
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
];

module.exports = { validateCategory };
