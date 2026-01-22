const getLengthErrorMessage = (fieldName, minCharacters, maxCharacters) => {
	const isOptionalField = minCharacters === 0;
	if (isOptionalField)
		return `${fieldName} must be at most ${maxCharacters} characters`;

	return `${fieldName} must be between ${minCharacters} and ${maxCharacters} characters`;
};

module.exports = { getLengthErrorMessage };
