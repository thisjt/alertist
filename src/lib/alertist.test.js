import dom from './dom';
dom();

import { expect, test, describe, vi } from 'vitest';

import alertist from './alertist';

describe.todo('alertist main', () => {
	test('alertist.alert', async () => {
		alertist.alert({ text: 'Hello, World!' }).then(() => {
			expect(1).toBe(1);
			console.log('RUN!');
		});
		alertist.confirm({ text: 'Hello, World!' }).then((value) => {
			expect(value).toBe(true);
		});
		alertist.prompt({ text: 'Hello, World!' }).then((value) => {
			expect(value).toBe('#value1#');
		});
		alertist.toast({ text: 'Hello, World!' }).then((value) => {
			expect(value).toBe(true);
		});

		setTimeout(() => {
			expect(document.querySelector('.alertist').length).toBe(0);
		}, 100);

		// vi.runAllTimersAsync();
	});
});
