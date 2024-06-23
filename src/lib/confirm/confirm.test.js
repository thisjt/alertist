import { describe, expect, test, vi } from 'vitest';

import alertistConfirm from './confirm';

describe('alertist confirm', () => {
	test.sequential('basic usage, close using ok button', async () => {
		alertistConfirm({
			text: '#value1#',
			title: '#value2#',
			custom: 'error',
			button: '#value3#',
			cancel: '#value4#',
		}).then((value) => {
			expect(value).toBe(true);
		});
		setTimeout(() => {
			const alertistDialog = document.querySelector('.alertist');
			if (alertistDialog === null) {
				expect(1).toBe(0);
			} else {
				expect(alertistDialog.querySelector('.alertist-title_close').outerHTML).toContain('alertist-title_error_close');
				expect(alertistDialog.querySelector('.alertist-body').outerHTML).toContain('#value1#');
				expect(alertistDialog.querySelector('.alertist-title').outerHTML).toContain('#value2#');
				expect(alertistDialog.querySelector('.alertist-footer_button').outerHTML).toContain('#value3#');
				expect(alertistDialog.querySelector('.alertist-footer_cancelbutton').outerHTML).toContain('#value4#');
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
		}, 200);
	});

	test.sequential('close using x button', async () => {
		alertistConfirm({
			text: 'text',
		}).then((value) => {
			expect(value).toBe(null);
		});
		setTimeout(() => {
			const alertistDialog = document.querySelector('.alertist');
			if (alertistDialog === null) {
				expect(1).toBe(0);
			} else {
				expect(1).toBe(1);
				document.querySelector('.alertist-title_close').click();
			}
		}, 100);

		setTimeout(() => {
			const alertistDialog = document.querySelector('.alertist');
			if (alertistDialog === null) {
				expect(1).toBe(1);
			} else {
				expect(1).toBe(0);
			}
		}, 200);
	});

	test.sequential('close using cancel button', async () => {
		alertistConfirm({
			text: 'text',
		}).then((value) => {
			expect(value).toBe(null);
		});
		setTimeout(() => {
			const alertistDialog = document.querySelector('.alertist');
			if (alertistDialog === null) {
				expect(1).toBe(0);
			} else {
				expect(1).toBe(1);
				document.querySelector('.alertist-footer_cancelbutton').click();
			}
		}, 100);

		setTimeout(() => {
			const alertistDialog = document.querySelector('.alertist');
			if (alertistDialog === null) {
				expect(1).toBe(1);
			} else {
				expect(1).toBe(0);
			}
		}, 200);
	});

	test.sequential('close using escape key', async () => {
		alertistConfirm({
			text: 'text',
		}).then((value) => {
			expect(value).toBe(null);
		});
		setTimeout(() => {
			const alertistDialog = document.querySelector('.alertist');
			if (alertistDialog === null) {
				expect(1).toBe(0);
			} else {
				expect(1).toBe(1);
				document.querySelector('.alertist').dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
			}
		}, 100);

		setTimeout(() => {
			const alertistDialog = document.querySelector('.alertist');
			if (alertistDialog === null) {
				expect(1).toBe(1);
			} else {
				expect(1).toBe(0);
			}
		}, 200);
	});

	// test.sequential('use outside browser context', async () => {
	// 	// document = undefined;
	// 	// DOMParser = undefined;
	// 	await alertistConfirm({ text: 'Hello!' });
	// 	expect(1).toBe(1);
	// });
});
