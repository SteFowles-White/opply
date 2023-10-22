import { defineRule } from "vee-validate";

defineRule("required", (value) => {
	// No value in input field
	if (!value || !value.length) {
		return "This field is required";
	}

	return true;
});

defineRule("username", (value) => {
	const regex = /^[\w.@+-]+$/i;

	// If the field is empty
	if (!value || !value.length) {
		return "This field is required";
	}

	// If the field is not a valid email
	if (!regex.test(value)) {
		return "This field must be a valid username";
	}

	return true;
});

defineRule("email", (value) => {
	const regex = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
	const specialCharacter = /^[!#$%&’*+/=?^`{|}~]+@/;

	// If the field is not a valid email
	if (!regex.test(value) || specialCharacter.test(value)) {
		return "This field must be a valid email address";
	}

	return true;
});

defineRule("minMax", (value, [min, max]) => {
	// The field is empty so it should pass
	if (!value || !value.length) {
		return true;
	}

	// Check if string is less than min value
	if (value.length < min) {
		return `This field must be greater than ${min}`;
	}

	// Check if string is more than max value
	if (value.length > max) {
		return `This field must be less than ${max}`;
	}

	return true;
});
