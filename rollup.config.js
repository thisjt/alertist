export default [
	{
		input: 'src/js/main.js',
		output: {
			name: 'alertist',
			file: 'dist/alertist.js',
			format: 'esm',
			compact: true,
		},
	},
	{
		input: 'src/js/main.js',
		output: {
			name: 'alertist',
			file: 'dist/alertist.browser.js',
			format: 'iife',
			compact: true,
		},
	},
	{
		input: 'src/js/main.js',
		output: {
			file: 'dist/alertist.cjs',
			format: 'cjs',
			compact: true,
		},
	},
];
