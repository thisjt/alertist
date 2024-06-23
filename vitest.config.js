import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		coverage: {
			provider: 'istanbul',
			enabled: true,
			extensions: ['.js'],
			include: ['src/lib/**/*.js'],
		},
		browser: {
			enabled: true,
			name: 'chrome',
			headless: true,
			api: 5001,
		},
	},
});
