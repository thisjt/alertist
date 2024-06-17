import terser from '@rollup/plugin-terser';

export default [
	{
		input: 'src/lib/alertist.js',
		output: {
			name: 'alertist',
			file: 'dist/alertist.js',
			format: 'esm',
		},
	},
	{
		input: 'src/lib/alertist.js',
		output: {
			name: 'alertist',
			file: 'dist/alertist.min.js',
			format: 'esm',
			compact: true,
			plugins: [terser()],
		},
	},
	{
		input: 'src/lib/alertist.js',
		output: {
			name: 'alertist',
			file: 'dist/alertist.browser.js',
			format: 'iife',
		},
	},
	{
		input: 'src/lib/alertist.js',
		output: {
			name: 'alertist',
			file: 'dist/alertist.browser.min.js',
			format: 'iife',
			compact: true,
			plugins: [terser()],
		},
	},
	{
		input: 'src/lib/alertist.js',
		output: {
			file: 'dist/alertist.cjs',
			format: 'cjs',
		},
	},
	{
		input: 'src/lib/alertist.js',
		output: {
			file: 'dist/alertist.min.cjs',
			format: 'cjs',
			compact: true,
			plugins: [terser()],
		},
	},
];
