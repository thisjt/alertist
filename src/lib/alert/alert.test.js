import { describe, expect, test, vi } from 'vitest';
import dom from '../dom';
dom();

import alertistAlert from './alert';

describe('alertist alert', () => {
	test.sequential('basic usage, close using ok button', async () => {
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
				expect(alertistDialog.querySelector('.alertist-title_close').outerHTML).toContain('alertist-title_error_close');
				expect(alertistDialog.querySelector('.alertist-body').outerHTML).toContain('#value1#');
				expect(alertistDialog.querySelector('.alertist-title').outerHTML).toContain('#value2#');
				expect(alertistDialog.querySelector('.alertist-footer_button').outerHTML).toContain('#value3#');
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

		await vi.runAllTimersAsync();
	});

	test.sequential('close using x button', async () => {
		alertistAlert({
			text: 'text',
		}).then(() => {
			expect(1).toBe(1);
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

		await vi.runAllTimersAsync();
	});

	test.sequential('use outside browser context', async () => {
		document = undefined;
		DOMParser = undefined;
		await alertistAlert({ text: 'Hello!' });
		expect(1).toBe(1);
	});
});
