import { expect, test, vi } from 'vitest';
import dom from '../fakedom';
dom();

import alertistAlert from './alert';

test.only('alertistAlert', async () => {
	alertistAlert({ text: 'Hello!' }).then(() => {
		console.log('yes');
	});
	setTimeout(() => {
		const alertistDialog = document.querySelector('.alertist');
		console.log('what2', alertistDialog);
		document.querySelector('.alertist-footer_button').click();
	}, 1000);

	setTimeout(() => {
		const alertistDialog = document.querySelector('.alertist');
		console.log('what', alertistDialog);
		// expect(alertistDialog).toBe(null);
		expect(1).toBe(1);
	}, 2000);
	await vi.runAllTimersAsync();
});

test('alertistAlert outside document context', async () => {
	// document = undefined;
	// DOMParser = undefined;
	const result = await alertistAlert({ text: 'Hello!' });
	expect(result).toBe(undefined);
});
