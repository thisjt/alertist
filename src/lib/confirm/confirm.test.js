import { describe, expect, test, vi } from 'vitest';
import dom from '../fakedom';
dom();

import alertistConfirm from './confirm';

describe('alertistConfirm', () => {
	test('alertistConfirm usage', async () => {
		alertistConfirm({
			text: '#value1#',
			title: '#value2#',
			custom: 'error',
			button: '#value3#',
			cancel: '#value4#',
		}).then(() => {
			expect(1).toBe(1);
		});
		setTimeout(() => {
			const alertistDialog = document.querySelector('.alertist');
			if (alertistDialog === null) {
				expect(1).toBe(0);
			} else {
				expect(1).toBe(1);
				expect(alertistDialog.querySelector().outerHTML).toContain('alertist-title_error_close');
				expect(alertistDialog.querySelector().outerHTML).toContain('#value1#');
				expect(alertistDialog.querySelector().outerHTML).toContain('#value2#');
				expect(alertistDialog.querySelector().outerHTML).toContain('#value3#');
				expect(alertistDialog.querySelector().outerHTML).toContain('#value4#');
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
			alertistConfirm({
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
	});
});
