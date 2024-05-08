import alertist from './main';
import jsdom from 'jsdom';
const JSDOM = jsdom.JSDOM;

const dom = new JSDOM(`<!DOCTYPE html><html lang="en"></html>`);

// No support for HTMLDialogElement yet
// https://github.com/jsdom/jsdom/issues/3294
dom.window.HTMLDialogElement.prototype.showModal = () => {};
dom.window.HTMLDialogElement.prototype.close = () => {};

global.document = dom.window.document;
global.DOMParser = dom.window.DOMParser;

describe('open "confirm" and test all values', () => {
	const alertist_run = alertist.confirm({
		title: 'TITLE',
		text: 'BODY',
		button: 'OKBUTTON',
		cancel: 'CANCELBUTTON',
	});
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

describe('open "confirm" and test ok callback', () => {
	it('dialog closed, okCallback called', (done) => {
		let okstatus = 0;
		const alertist_run = alertist.confirm({
			title: 'TITLE',
			text: 'BODY',
			button: 'OKBUTTON',
			cancel: 'CANCELBUTTON',
			okCallback: () => {
				okstatus = 1;
			},
		});
		alertist_run.element.setAttribute('open', '');
		alertist_run.element.querySelector('.alertist-footer_button').click();
		setTimeout(() => {
			expect(okstatus).toBe(1);
			done();
		}, 50);
	});
});

describe('open "confirm" and test close callback', () => {
	it('dialog closed, x button clicked, closeCallback called', (done) => {
		let okstatus = 0;
		const alertist_run = alertist.confirm({
			title: 'TITLE',
			text: 'BODY',
			button: 'OKBUTTON',
			cancel: 'CANCELBUTTON',
			cancelCallback: () => {
				okstatus = 1;
			},
		});
		alertist_run.element.setAttribute('open', '');
		alertist_run.element.querySelector('.alertist-title_close').click();
		setTimeout(() => {
			expect(okstatus).toBe(1);
			done();
		}, 50);
	});

	it('dialog closed, cancel button clicked, closeCallback called', (done) => {
		let okstatus = 0;
		const alertist_run = alertist.confirm({
			title: 'TITLE',
			text: 'BODY',
			button: 'OKBUTTON',
			cancel: 'CANCELBUTTON',
			cancelCallback: () => {
				okstatus = 1;
			},
		});
		alertist_run.element.setAttribute('open', '');
		alertist_run.element.querySelector('.alertist-footer_cancelbutton').click();
		setTimeout(() => {
			expect(okstatus).toBe(1);
			done();
		}, 50);
	});

	it('dialog closed, backdrop clicked, closeCallback called', (done) => {
		let okstatus = 0;
		const alertist_run = alertist.confirm({
			title: 'TITLE',
			text: 'BODY',
			button: 'OKBUTTON',
			cancel: 'CANCELBUTTON',
			cancelCallback: () => {
				okstatus = 1;
			},
		});
		alertist_run.element.setAttribute('open', '');
		alertist_run.element.click();
		setTimeout(() => {
			expect(okstatus).toBe(1);
			done();
		}, 50);
	});
});
