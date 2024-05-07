import alertist from './main';
import jsdom from 'jsdom';
import jest from 'jest';
const JSDOM = jsdom.JSDOM;

const dom = new JSDOM(`<!DOCTYPE html><html lang="en"></html>`);

// No support for HTMLDialogElement yet
// https://github.com/jsdom/jsdom/issues/3294
dom.window.HTMLDialogElement.prototype.showModal = () => {
	console.log('mock DIALOG.showModal() triggered');
};
dom.window.HTMLDialogElement.prototype.close = () => {
	console.log('mock DIALOG.close() triggered');
};

global.document = dom.window.document;
global.DOMParser = dom.window.DOMParser;

describe('open basic alert and test all values', () => {
	const alertist_run = alertist.confirm('TITLE', 'BODY', 'OKBUTTON', 'CANCELBUTTON');
	const title_text = alertist_run.element.querySelector('.alertist-title').innerHTML;
	const body_text = alertist_run.element.querySelector('.alertist-body').innerHTML;
	const button_text = alertist_run.element.querySelector('.alertist-footer_button').innerHTML;
	const cancel_text = alertist_run.element.querySelector('.alertist-footer_cancelbutton').innerHTML;
	const close_button = alertist_run.element.querySelector('.alertist-title_close img').getAttribute('src');

	it('title is correct ', () => {
		expect(title_text).toBe('TITLE');
	});

	it('body is correct ', () => {
		expect(body_text).toBe('BODY');
	});

	it('button is correct ', () => {
		expect(button_text).toBe('OKBUTTON');
	});

	it('cancel is correct ', () => {
		expect(cancel_text).toBe('CANCELBUTTON');
	});

	it('close image ok', () => {
		expect(close_button.includes('data:image/png;base64,')).toBe(true);
	});
});
