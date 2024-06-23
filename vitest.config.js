import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		coverage: {
			provider: 'istanbul',
			enabled: true,
			extensions: ['.js'],
			include: ['src/lib/**/*.js'],
			exclude: ['src/lib/dom.js'],
		},
		browser: {
			enabled: true,
			name: 'chrome',
			headless: true,
			api: 5001,
		},
	},
});
