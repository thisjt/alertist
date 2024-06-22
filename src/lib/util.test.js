import { expect, test } from 'vitest';
import dom from './fakedom';
dom();

import { alertistBucket, alertistToastBucket, alertistStringToHtml, alertistInit, alertistCleanup, alertistRandomString, alertistButtons } from './util';

test('alertistBucket is null', () => {
	expect(alertistBucket).toBe(null);
});

test('alertistToastBucket is null', () => {
	expect(alertistToastBucket).toBe(null);
});

test('alertistStringToHtml', () => {
	const html = alertistStringToHtml('<div>test</div>');
	expect(html.outerHTML).toBe('<div>test</div>');
});

test('alertistRandomString', () => {
	expect(alertistRandomString().length).toBeGreaterThan(0);
});

test('alertistButtons', () => {
	expect(alertistButtons.close).toContain('data:image/png;base64');
});

test('alertistCleanup before init', () => {
	expect(alertistCleanup()).toBe(undefined);
});

test('alertistInit', () => {
	expect(alertistInit()).toBe(true);
});

test('alertistCleanup after init', () => {
	expect(alertistCleanup()).toBe(undefined);
});

test('alertistInit outside document context', () => {
	global.document = undefined;
	expect(alertistInit()).toBe(null);
});
