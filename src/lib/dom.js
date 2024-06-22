import { vi } from 'vitest';
import jsdom from 'jsdom';
const JSDOM = jsdom.JSDOM;

export default function dom() {
	const dom = new JSDOM('<!DOCTYPE html><html lang="en"></html>');
	const doc = dom.window.document;

	// No support for HTMLDialogElement yet
	// https://github.com/jsdom/jsdom/issues/3294
	dom.window.HTMLDialogElement.prototype.showModal = () => {
		// Mock opening of a dialog element
		doc.querySelector('dialog').setAttribute('open', '');
		doc.querySelector('dialog').dispatchEvent(new dom.window.Event('open'));
	};
	dom.window.HTMLDialogElement.prototype.close = () => {
		// Mock closing of a dialog element
		doc.querySelector('dialog').removeAttribute('open');
		doc.querySelector('dialog').dispatchEvent(new dom.window.Event('close'));
	};
	dom.window.HTMLElement.prototype.showPopover = () => {};

	vi.stubGlobal('document', doc);
	vi.stubGlobal('DOMParser', dom.window.DOMParser);
	vi.stubGlobal('KeyboardEvent', dom.window.KeyboardEvent);
	vi.useFakeTimers();

	return dom;
}
