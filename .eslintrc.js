
module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	plugins: [
		'@typescript-eslint',
	],
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
	],
	env: {
		"browser": true,
	},
	rules: {
		"@typescript-eslint/triple-slash-reference": "off",
		"@typescript-eslint/explicit-function-return-type": "off",
		"no-undef": "off",
		"@typescript-eslint/no-use-before-define": "off",
		"@typescript-eslint/camelcase": "off",
		"@typescript-eslint/member-delimiter-style": "off",
		"@typescript-eslint/no-unused-vars": "off",
		"@typescript-eslint/no-explicit-any": "off",
		"@typescript-eslint/no-non-null-assertion": "off",
		"@typescript-eslint/no-explicit-any": "off",
		"no-constant-condition": ["error", { "checkLoops": false }],
		"@typescript-eslint/no-empty-function": "off",
		"no-inner-declarations": "off",
		"@typescript-eslint/interface-name-prefix": "off",

		"no-console": ["error", { allow: ["error", "warn", "trace",] }],
		"no-empty": "off",
	},
};
