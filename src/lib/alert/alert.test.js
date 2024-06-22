import { describe, expect, test, vi } from 'vitest';
import dom from '../fakedom';
dom();

import alertistAlert from './alert';

describe('alertistAlert', () => {
	test('alertistAlert usage', async () => {
		alertistAlert({
			text: '#value1#',
			title: '#value2#',
			custom: 'error',
			button: '#value3#',
		}).then(() => {
			expect(1).toBe(1);
		});
		setTimeout(() => {
			const alertistDialog = document.querySelector('.alertist');
			if (alertistDialog === null) {
				expect(1).toBe(0);
			} else {
				expect(1).toBe(1);
				expect(alertistDialog.outerHTML).toContain('alertist-title_error_close');
				expect(alertistDialog.outerHTML).toContain('#value1#');
				expect(alertistDialog.outerHTML).toContain('#value2#');
				expect(alertistDialog.outerHTML).toContain('#value3#');
			}
			document.querySelector('.alertist-footer_button').click();
		}, 100);

		setTimeout(() => {
			const alertistDialog = document.querySelector('.alertist');
			if (alertistDialog === null) {
				expect(1).toBe(1);
			} else {
				expect(1).toBe(0);
			}
			alertistAlert({
				text: 'text',
			}).then(() => {
				expect(1).toBe(1);
			});
		}, 200);

		setTimeout(() => {
			const alertistDialog = document.querySelector('.alertist');
			if (alertistDialog === null) {
				expect(1).toBe(0);
			} else {
				expect(1).toBe(1);
				document.querySelector('.alertist-title_close').click();
			}
		}, 300);

		setTimeout(() => {
			const alertistDialog = document.querySelector('.alertist');
			if (alertistDialog === null) {
				expect(1).toBe(1);
			} else {
				expect(1).toBe(0);
			}
		}, 400);

		await vi.runAllTimersAsync();
	});

	test('alertistAlert outside document context', async () => {
		document = undefined;
		DOMParser = undefined;
		await alertistAlert({ text: 'Hello!' });
		expect(1).toBe(1);
	});
});
