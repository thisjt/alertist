module.exports = {
	root: true,
	extends: ['eslint:recommended', 'prettier'],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020,
	},
	env: {
		browser: true,
		es2017: true,
		node: true,
	},
	globals: {
		api: 'readonly',
		clients: 'readonly',
		test: 'readonly',
		expect: 'readonly',
	},
	rules: {
		'no-undef': ['error', { typeof: true }],
		indent: ['error', 'tab', { SwitchCase: 1 }],
		eqeqeq: 'error',
		'keyword-spacing': 'error',
		'max-len': [
			'error',
			{
				code: 200,
			},
		],
		'max-lines-per-function': [
			'error',
			{
				max: 500,
				skipComments: true,
				skipBlankLines: true,
			},
		],
		quotes: ['error', 'single'],
		semi: ['error', 'always'],
		'comma-spacing': [
			'error',
			{
				before: false,
				after: true,
			},
		],
		'no-template-curly-in-string': 'error',
		'no-useless-return': 'error',
		'no-console': 'error',
		'key-spacing': [
			'error',
			{
				beforeColon: false,
				afterColon: true,
			},
		],
		'max-depth': ['error', 6],
		'no-multiple-empty-lines': [
			'error',
			{
				max: 3,
			},
		],
		'no-trailing-spaces': 'error',
		'one-var-declaration-per-line': 'error',
		'no-var': 'error',
	},
};
