import { vi } from 'vitest';
import jsdom from 'jsdom';
const JSDOM = jsdom.JSDOM;

export default function dom() {
	const dom = new JSDOM('<!DOCTYPE html><html lang="en"></html>');

	// No support for HTMLDialogElement yet
	// https://github.com/jsdom/jsdom/issues/3294
	dom.window.HTMLDialogElement.prototype.showModal = () => {};
	dom.window.HTMLDialogElement.prototype.close = () => {};
	dom.window.HTMLElement.prototype.showPopover = () => {};

	vi.stubGlobal('document', dom.window.document);
	vi.stubGlobal('DOMParser', dom.window.DOMParser);

	return dom;
}
