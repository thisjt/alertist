'use strict';

/**@type {HTMLElement | null} */
let alertistBucket = null;

/**@type {HTMLElement | null} */
let alertistToastBucket = null;

/**
 * Converts a string to an HTMLElement.
 * @param {string} string
 * @returns {HTMLElement} HTMLElement
 */
function alertistStringToHtml(string) {
	const parser = new DOMParser();
	const doc = parser.parseFromString(string, 'text/html');
	return /**@type {HTMLElement}*/ (doc.body.firstChild);
}

/**
 * Initializes the alertist bucket.
 * @returns {null | true}
 */
function alertistInit() {
	if (typeof document !== 'object' || typeof DOMParser !== 'function') {
		return null;
	}
	let bucketSelector = /**@type {HTMLElement}*/ (document.querySelector('.alertist-bucket'));
	let toastBucketSelector = /**@type {HTMLElement}*/ (document.querySelector('.alertist-toast-bucket'));
	if (!bucketSelector) {
		bucketSelector = document.createElement('span');
		bucketSelector.classList.add('alertist-bucket');
		document.querySelector('body')?.append(bucketSelector);
		alertistBucket = bucketSelector;
	}
	if (!toastBucketSelector) {
		toastBucketSelector = alertistStringToHtml(/*html*/ `
			<div class="alertist-toast-bucket" popover="manual">
				<div class="alertist-toast-container">
				</div>
			</div>
		`);

		document.querySelector('body')?.append(toastBucketSelector);
		toastBucketSelector.showPopover();
		alertistToastBucket = toastBucketSelector.querySelector('.alertist-toast-container');
	}

	return true;
}

const alertistButtons = {
	close:
		'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAMAAACelLz8AAAAElBMVEX///9HcEz///////////////84chYNAAAABnRSTlP9ABWejzIjLOoFAAAAlUlEQVQoz3VSWRbEIAwi2/2vPG5tg8nohz6JBBFIhDRjnEIB0xt' +
		'QB2LMik1kADIXZ8xXOUTtuqcbEXzbB3lK8RIQ29zgLdz9EgWYJJODRElui9zcSRBIGEkFPyc/EOwBXCq0L3WEW3Ur4xxa8hrkKHkNMqMa9dfe7lN8fcqFfPQQr+E4AWhjYziJasJmK1ERWhOqI6I/koMDV9q/Is8AAAAASUVORK5CYII=',
};

/**
 * Displays an Alert Box using the Alertist library.
 * @param {Object} options
 * @param {string} options.text - Text body of the Alert Box
 * @param {string} [options.title] - Title of the Alert Box
 * @param {"error"} [options.custom] - Title bar customization. Only `error` supported for now
 * @param {string} [options.button] - OK Button text of the Alert Box
 * @returns {Promise<void>} `Promise<void>`
 * @example
 * ```js
 * import alertist from 'alertist';
 * alertist.alert({ text: 'Hello!' });
 * ```
 */
async function alertistAlert({ text, title, custom, button }) {
	if (!alertistInit()) {
		console.error('alertist: init - not in a browser environment.');
		return;
	}

	const parsedHTML = /**@type {HTMLDialogElement} */ (
		alertistStringToHtml(/*html*/ `
			<dialog class="alertist">
				<div class="alertist-container alertist-alert">
					<div class="alertist-header">
						<div class="alertist-title" draggable="true"></div>
						<button class="alertist-title_close"><img src="${alertistButtons.close}" alt=""></button>
					</div>
					<div class="alertist-body alertist-wordbreak"></div>
					<div class="alertist-footer">
						<button class="alertist-footer_button"></button>
					</div>
				</div>
			</dialog>
		`)
	);

	/**@type {HTMLDivElement}*/ (parsedHTML.querySelector('.alertist-title')).textContent = title || '';
	/**@type {HTMLDivElement}*/ (parsedHTML.querySelector('.alertist-body')).innerHTML = text;
	/**@type {HTMLDivElement}*/ (parsedHTML.querySelector('.alertist-footer_button')).textContent = button || 'OK';

	if (custom === 'error') {
		/**@type {HTMLDivElement}*/ (parsedHTML.querySelector('.alertist-title')).classList.add('alertist-title_error');
		/**@type {HTMLButtonElement}*/ (parsedHTML.querySelector('.alertist-title_close')).classList.add('alertist-title_error_close');
	}

	alertistBucket?.append(parsedHTML);

	parsedHTML.querySelector('.alertist-footer_button')?.addEventListener('click', () => {
		parsedHTML.close();
	});

	parsedHTML.querySelector('.alertist-title_close')?.addEventListener('click', () => {
		parsedHTML.close();
	});

	parsedHTML.addEventListener('close', () => {
		parsedHTML.remove();
	});

	parsedHTML.showModal();

	/**@type {HTMLButtonElement}*/ (parsedHTML.querySelector('.alertist-footer_button')).focus();

	return new Promise((resolve) => {
		parsedHTML.addEventListener('close', () => {
			resolve();
		});
	});
}

/**
 * Displays a Confirm Box using the Alertist library.
 * @param {Object} options
 * @param {string} options.text - Text body of the Confirm Box
 * @param {string} [options.title] - Title of the Confirm Box
 * @param {"error"} [options.custom] - Title bar customization. Only `error` supported for now
 * @param {string} [options.button] - OK Button text of the Confirm Box
 * @param {string} [options.cancel] - Cancel button text of the Confirm Box
 * @returns {Promise<true | null>} `Promise<true | null>` - `true` if the user clicked OK, `null` if the user clicked Cancel or closed the dialog
 * @example
 * ```js
 * import alertist from 'alertist';
 * alertist.confirm({ text: 'Hello!' });
 * ```
 */
async function alertistConfirm({ text, title, custom, button, cancel }) {
	if (!alertistInit()) {
		console.error('alertist: init - not in a browser environment.');
		return null;
	}

	const parsedHTML = /**@type {HTMLDialogElement} */ (
		alertistStringToHtml(/*html*/ `
			<dialog class="alertist">
				<div class="alertist-container alertist-confirm">
					<div class="alertist-header">
						<div class="alertist-title" draggable="true"></div>
						<button class="alertist-title_close"><img src="${alertistButtons.close}" alt=""></button>
					</div>
					<div class="alertist-body alertist-wordbreak"></div>
					<div class="alertist-footer">
						<button class="alertist-footer_button"></button>
						<button class="alertist-footer_cancelbutton"></button>
					</div>
				</div>
			</dialog>
		`)
	);

	/**@type {HTMLDivElement}*/ (parsedHTML.querySelector('.alertist-title')).textContent = title || '';
	/**@type {HTMLDivElement}*/ (parsedHTML.querySelector('.alertist-body')).innerHTML = text;
	/**@type {HTMLDivElement}*/ (parsedHTML.querySelector('.alertist-footer_button')).textContent = button || 'OK';
	/**@type {HTMLDivElement}*/ (parsedHTML.querySelector('.alertist-footer_cancelbutton')).textContent = cancel || 'Cancel';

	if (custom === 'error') {
		/**@type {HTMLDivElement}*/ (parsedHTML.querySelector('.alertist-title')).classList.add('alertist-title_error');
		/**@type {HTMLButtonElement}*/ (parsedHTML.querySelector('.alertist-title_close')).classList.add('alertist-title_error_close');
	}

	alertistBucket?.append(parsedHTML);

	parsedHTML.showModal();

	/**@type {HTMLButtonElement}*/ (parsedHTML.querySelector('.alertist-footer_button')).focus();

	return new Promise((resolve) => {
		parsedHTML.querySelector('.alertist-footer_button')?.addEventListener('click', () => {
			resolve(true);
			parsedHTML.close();
		});

		parsedHTML.querySelector('.alertist-footer_cancelbutton')?.addEventListener('click', () => {
			resolve(null);
			parsedHTML.close();
		});

		parsedHTML.querySelector('.alertist-title_close')?.addEventListener('click', () => {
			resolve(null);
			parsedHTML.close();
		});

		parsedHTML.addEventListener('keydown', (e) => {
			const event = /**@type {KeyboardEvent}*/ (e);
			if (event.key === 'Escape') {
				e.preventDefault();
				resolve(null);
				parsedHTML.close();
			}
		});

		parsedHTML.addEventListener('close', () => {
			parsedHTML.remove();
		});
	});
}

/**
 * Displays a Prompt Box using the Alertist library.
 * @param {Object} options
 * @param {string} options.text - Text body of the Prompt Box
 * @param {string} [options.title] - Title of the Prompt Box
 * @param {"error"} [options.custom] - Title bar customization
 * @param {"input" | "textarea" | "password"} [options.type] - Type of the Prompt Box. Can be `input` (default), `textarea`, or `password`
 * @param {string} [options.placeholder] - Placeholder text of the Prompt Box
 * @param {string} [options.button] - OK Button text of the Prompt Box
 * @param {string} [options.cancel] - Cancel button text of the Prompt Box
 * @returns {Promise<string | null>} `Promise<string | null>` - returns the typed string if the user clicked OK, `null` if the user clicked Cancel or closed the dialog
 * @example
 * import alertist from 'alertist';
 * alertist.prompt({ text: 'Hello!' });
 */
async function alertistPrompt({ text, title, custom, type, placeholder, button, cancel }) {
	if (!alertistInit()) {
		console.error('alertist: init - not in a browser environment.');
		return null;
	}

	const parsedHTML = /**@type {HTMLDialogElement} */ (
		alertistStringToHtml(/*html*/ `
			<dialog class="alertist">
				<div class="alertist-container alertist-prompt">
					<div class="alertist-header">
						<div class="alertist-title" draggable="true"></div>
						<button class="alertist-title_close"><img src="${alertistButtons.close}" alt=""></button>
					</div>
					<div class="alertist-body alertist-wordbreak"></div>
					<div class="alertist-input">
						<input type="text">
						<textarea></textarea>
					</div>
					<div class="alertist-footer">
						<button class="alertist-footer_button"></button>
						<button class="alertist-footer_cancelbutton"></button>
					</div>
				</div>
			</dialog>
		`)
	);

	let inputElement = /**@type {HTMLInputElement}*/ (parsedHTML.querySelector('.alertist-input input'));
	let textareaElement = /**@type {HTMLTextAreaElement}*/ (parsedHTML.querySelector('.alertist-input textarea'));

	/**@type {HTMLDivElement}*/ (parsedHTML.querySelector('.alertist-title')).textContent = title || '';
	/**@type {HTMLDivElement}*/ (parsedHTML.querySelector('.alertist-body')).innerHTML = text;
	/**@type {HTMLDivElement}*/ (parsedHTML.querySelector('.alertist-footer_button')).textContent = button || 'OK';
	/**@type {HTMLDivElement}*/ (parsedHTML.querySelector('.alertist-footer_cancelbutton')).textContent = cancel || 'Cancel';
	inputElement.placeholder = placeholder || '';
	textareaElement.placeholder = placeholder || '';

	if (custom === 'error') {
		/**@type {HTMLDivElement}*/ (parsedHTML.querySelector('.alertist-title')).classList.add('alertist-title_error');
		/**@type {HTMLButtonElement}*/ (parsedHTML.querySelector('.alertist-title_close')).classList.add('alertist-title_error_close');
	}

	alertistBucket?.append(parsedHTML);

	parsedHTML.showModal();

	let inputMainElement = type === 'textarea' ? textareaElement : inputElement;

	switch (type) {
		case 'textarea':
			inputElement.remove();
			textareaElement.focus();
			break;

		case 'password':
			inputElement.type = 'password';
			textareaElement.remove();
			inputElement.focus();
			break;
		default:
			textareaElement.remove();
			inputElement.focus();
			break;
	}

	return new Promise((resolve) => {
		inputMainElement.addEventListener('keydown', (e) => {
			const event = /**@type {KeyboardEvent}*/ (e);
			if (event.key === 'Enter' && !event.shiftKey) {
				e.preventDefault();
				resolve(inputMainElement.value);
				parsedHTML.close();
			}
		});

		parsedHTML.querySelector('.alertist-footer_button')?.addEventListener('click', () => {
			resolve(inputMainElement.value);
			parsedHTML.close();
		});

		parsedHTML.querySelector('.alertist-footer_cancelbutton')?.addEventListener('click', () => {
			resolve(null);
			parsedHTML.close();
		});

		parsedHTML.querySelector('.alertist-title_close')?.addEventListener('click', () => {
			resolve(null);
			parsedHTML.close();
		});

		parsedHTML.addEventListener('keydown', (e) => {
			const event = /**@type {KeyboardEvent}*/ (e);
			if (event.key === 'Escape') {
				e.preventDefault();
				resolve(null);
				parsedHTML.close();
			}
		});

		parsedHTML.addEventListener('close', () => {
			parsedHTML.remove();
		});
	});
}

/**
 * Displays a Toast Notification using the Alertist library.
 * @param {Object} options
 * @param {string} options.text - Text body of the Toast Notification
 * @param {false} [options.closeonclick] - Close the Toast Notification when clicked. Defaults to true.
 * @param {true} [options.closebutton] - Show a close button on the Toast Notification
 * @param {number} [options.timeout] - Time in milliseconds before the Toast Notification closes itself. Defaults to 5000ms. 0ms will make the toast persist.
 * @param {string} [options.type] - Type of the Toast Notification. Can be 'success', 'error', 'warning', 'info'
 * @returns {Promise<true | null>} `Promise<true | null>` - returns `true` if the toast notification was clicked. `null` if the the toast was closed by timeout.
 * @example
 * import alertist from 'alertist';
 * alertist.toast({ text: 'Hello!' });
 *
 * // Be careful with setting timeout:0, closeonclick:false, and closebutton:false. This will make the toast permanently persist until a page refresh happens.
 */
async function alertistToast({ text, closeonclick, closebutton, timeout, type }) {
	if (!alertistInit()) {
		console.error('alertist: init - not in a browser environment.');
		return null;
	}

	const parsedHTML = /**@type {HTMLDivElement} */ (
		alertistStringToHtml(/*html*/ `
			<div class="alertist-toast-notification">
				<span class="alertist-toast-content"></span>
				${closebutton ? /*html*/ `<button class="alertist-toast-close"><img src="${alertistButtons.close}" alt=""></button>` : ''}
			</div>
		`)
	);

	/**@type {HTMLSpanElement}*/ (parsedHTML.querySelector('span.alertist-toast-content')).append(text);
	alertistToastBucket?.append(parsedHTML);
	setTimeout(() => {
		parsedHTML.classList.add('alertist-toast-notification-enter');
	});

	return new Promise((resolve) => {
		if (closeonclick !== false) {
			parsedHTML.addEventListener('click', () => {
				parsedHTML.classList.remove('alertist-toast-notification-enter');
				setTimeout(() => {
					parsedHTML.remove();
					resolve(true);
				}, 300);
			});
		}

		if (timeout !== 0) {
			setTimeout(() => {
				parsedHTML.classList.remove('alertist-toast-notification-enter');
				setTimeout(() => {
					parsedHTML.remove();
					resolve(null);
				}, 300);
			}, timeout || 5000);
		}

		if (closebutton) {
			/**@type {HTMLButtonElement}*/ (parsedHTML.querySelector('button.alertist-toast-close')).addEventListener('click', () => {
				parsedHTML.classList.remove('alertist-toast-notification-enter');
				setTimeout(() => {
					parsedHTML.remove();
					resolve(true);
				}, 300);
			});
		}
	});
}

/**
 * @namespace Alertist
 */
/**
 * @module Alertist
 * @description
 * A simple alert management system built on top of the native "dialog" HTML tag.
 * @example
 * import alertist from 'alertist';
 * alertist.alert({ text: 'Hello, World!' });
 * // Check https://npmjs.com/package/alertist for more examples
 * @returns {Alertist} Object that contains the alertist library methods
 */
const alertist = {
	alert: alertistAlert,
	confirm: alertistConfirm,
	prompt: alertistPrompt,
	toast: alertistToast,
};

module.exports = alertist;
