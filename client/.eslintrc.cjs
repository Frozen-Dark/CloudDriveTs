module.exports = {
	env: {
		browser: true,
		es2021: true,
		jest: true
	},
	extends: ["eslint:recommended", "react-app", "plugin:@typescript-eslint/recommended"],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		},
		ecmaVersion: "latest",
		sourceType: "module"
	},
	plugins: ["react", "@typescript-eslint", "react-hooks"],
	root: true,
	rules: {
		quotes: ["warn", "double"],
		"react/jsx-indent": [2, "tab"],
		indent: [2, "tab"],
		"react/jsx-filename-extension": [
			2,
			{
				extensions: [".js", ".jsx", ".tsx"]
			}
		],
		"import/no-unresolved": "off",
		"react-hooks/exhaustive-deps": "warn",
		"import/prefer-default-export": "off",
		"@typescript-eslint/no-unused-vars": "off",
		"no-unused-vars": "off",
		"@typescript-eslint/no-non-null-assertion": "off",
		"react/require-default-props": "off",
		"react/react-in-jsx-scope": "off",
		"react/jsx-props-no-spreading": "off",
		"react/function-component-definition": "off",
		"no-shadow": "off",
		"no-var-requires": "off",
		"@typescript-eslint/ban-ts-comment": "off",
		"@typescript-eslint/no-empty-function": "warn",
		"import/extensions": "off",
		"react/jsx-indent-props": "off",
		"@typescript-eslint/no-namespace": "off",
		"import/no-extraneous-dependencies": "off",
		"no-underscore-dangle": "off",
		"@typescript-eslint/no-var-requires": "off",
		"react-hooks/rules-of-hooks": "error",
	}
};
