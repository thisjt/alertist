export default [
	{
		input: 'src/js/main.js',
		output: {
			name: 'alertist',
			file: 'dist/alertist.js',
			format: 'esm',
		},
	},
	{
		input: 'src/js/main.js',
		output: {
			name: 'alertist',
			file: 'dist/alertist.browser.js',
			format: 'iife',
		},
	},
	{
		input: 'src/js/main.js',
		output: {
			file: 'dist/alertist.cjs',
			format: 'cjs',
		},
	},
];
