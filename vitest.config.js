import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		coverage: {
			enabled: true,
			extensions: ['.js'],
			include: ['src/lib/**/*.js'],
		},
	},
});
