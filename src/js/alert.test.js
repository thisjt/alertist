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

describe('open "alert" and test all values', () => {
	const alertist_run = alertist.alert({ title: 'TITLE1', text: 'BODY', button: 'OKBUTTON' });
	const title_text = alertist_run.element.querySelector('.alertist-title').innerHTML;
	const body_text = alertist_run.element.querySelector('.alertist-body').innerHTML;
	const button_text = alertist_run.element.querySelector('.alertist-footer_button').innerHTML;
	const close_button = alertist_run.element.querySelector('.alertist-title_close img').getAttribute('src');

	it('title is correct ', () => {
		expect(title_text).toBe('TITLE1');
	});

	it('body is correct ', () => {
		expect(body_text).toBe('BODY');
	});

	it('button is correct ', () => {
		expect(button_text).toBe('OKBUTTON');
	});

	it('close image ok', () => {
		expect(close_button.includes('data:image/png;base64,')).toBe(true);
	});
});

describe('open "alert" and test ok callback', () => {
	it('dialog closed, okCallback called', (done) => {
		let okstatus = 0;
		const alertist_run = alertist.alert({
			title: 'TITLE1',
			text: 'BODY',
			button: 'OKBUTTON',
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

describe('open "alert" and test close callback', () => {
	it('dialog closed, x button clicked, closeCallback called', (done) => {
		let okstatus = 0;
		const alertist_run = alertist.alert({
			title: 'TITLE1',
			text: 'BODY',
			button: 'OKBUTTON',
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

	it('dialog closed, backdrop clicked, closeCallback called', (done) => {
		let okstatus = 0;
		const alertist_run = alertist.alert({
			title: 'TITLE1',
			text: 'BODY',
			button: 'OKBUTTON',
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

describe('open "alert" and test check callback', () => {
	it('dialog closed, check returns boolean true, okCallback called', (done) => {
		let okstatus = 0;
		const alertist_run = alertist.alert({
			title: 'TITLE1',
			text: 'BODY',
			button: 'OKBUTTON',
			okCallback: () => {
				okstatus = 1;
			},
			check: () => {
				return true;
			},
		});
		alertist_run.element.setAttribute('open', '');
		alertist_run.element.querySelector('.alertist-footer_button').click();
		setTimeout(() => {
			expect(okstatus).toBe(1);
			done();
		}, 50);
	});

	it('dialog remains open, check returns boolean false', (done) => {
		let okstatus = 0;
		const alertist_run = alertist.alert({
			title: 'TITLE1',
			text: 'BODY',
			button: 'OKBUTTON',
			okCallback: () => {
				okstatus = 1;
			},
			check: () => {
				return false;
			},
		});
		alertist_run.element.setAttribute('open', '');
		alertist_run.element.querySelector('.alertist-footer_button').click();
		setTimeout(() => {
			expect(okstatus).toBe(0);
			done();
		}, 50);
	});

	it('dialog closed, check returns Promise that resolves, okCallback called', (done) => {
		let okstatus = 0;
		const alertist_run = alertist.alert({
			title: 'TITLE1',
			text: 'BODY',
			button: 'OKBUTTON',
			okCallback: () => {
				okstatus = 1;
			},
			check: () => {
				return new Promise((resolve, reject) => {
					setTimeout(() => {
						resolve();
					}, 100);
				});
			},
		});
		alertist_run.element.setAttribute('open', '');
		alertist_run.element.querySelector('.alertist-footer_button').click();
		setTimeout(() => {
			expect(okstatus).toBe(1);
			done();
		}, 200);
	});

	it('dialog remains open, check returns Promise that rejects', (done) => {
		let okstatus = 0;
		const alertist_run = alertist.alert({
			title: 'TITLE1',
			text: 'BODY',
			button: 'OKBUTTON',
			okCallback: () => {
				okstatus = 1;
			},
			check: () => {
				return new Promise((resolve, reject) => {
					setTimeout(() => {
						reject();
					}, 100);
				});
			},
		});
		alertist_run.element.setAttribute('open', '');
		alertist_run.element.querySelector('.alertist-footer_button').click();
		setTimeout(() => {
			expect(okstatus).toBe(0);
			done();
		}, 200);
	});
});
