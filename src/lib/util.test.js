import { expect, test, vi } from 'vitest';
import { dom } from './fakedom';
vi.stubGlobal('document', dom().window.document);
vi.stubGlobal('DOMParser', dom().window.DOMParser);

import { alertistBucket, alertistToastBucket, alertistStringToHtml } from './util';

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
