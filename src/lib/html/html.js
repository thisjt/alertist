import { alertistBucket, alertistStringToHtml, alertistInit, alertistButtons, alertistRandomString } from '../util';

/**
 * @function testFn
 * @param {HTMLDialogElement} dialog
 * @return {Promise<boolean>}
 */

/**
 * Displays a custom HTML Dialog Box with a "test" function checker using the Alertist library.
 * @param {Object} options
 * @param {string | HTMLElement} options.text - Text body of the Prompt Box
 * @param {string} [options.title] - Title of the Prompt Box
 * @param {"error"} [options.custom] - Title bar customization
 * @param {string} [options.button] - OK Button text of the Prompt Box
 * @param {string} [options.cancel] - Cancel button text of the Prompt Box
 * @param {(dialog: HTMLDialogElement) => Promise<boolean>} [options.test] - Function that must return a promise. If it resolves, the dialog closes. Useful for testing input.
 * @returns {Promise<HTMLDialogElement | null>} `Promise<string | null>` - returns the entire Dialog HTML DOM if the user clicks OK, `null` if the user clicked Cancel or closed the dialog
 * @example
 * import alertist from 'alertist';
 * alertist.html({ text: 'Hello!' });
 */
export default async function alertistHtml({ text, title, custom, button, cancel, test }) {
	alertistInit();

	const randomString = alertistRandomString();

	const parsedHTML = /**@type {HTMLDialogElement} */ (
		alertistStringToHtml(/*html*/ `
			<dialog class="alertist">
				<div class="alertist-container alertist-html">
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

	if (typeof text === 'string') {
		/**@type {HTMLDivElement}*/ (parsedHTML.querySelector('.alertist-body')).innerHTML = text;
	} else {
		/**@type {HTMLDivElement}*/ (parsedHTML.querySelector('.alertist-body')).appendChild(text);
	}

	/**@type {HTMLDivElement}*/ (parsedHTML.querySelector('.alertist-footer_button')).textContent = button || 'OK';
	/**@type {HTMLDivElement}*/ (parsedHTML.querySelector('.alertist-footer_cancelbutton')).textContent = cancel || 'Cancel';

	if (custom === 'error') {
		/**@type {HTMLDivElement}*/ (parsedHTML.querySelector('.alertist-title')).classList.add('alertist-title_error');
		/**@type {HTMLButtonElement}*/ (parsedHTML.querySelector('.alertist-title_close')).classList.add('alertist-title_error_close');
	}

	alertistBucket?.append(parsedHTML);
	parsedHTML.showModal();
	const okbutton = /**@type {HTMLButtonElement}*/ (parsedHTML.querySelector('.alertist-footer_button'));
	okbutton?.focus();

	return new Promise((resolve) => {
		parsedHTML.querySelector('.alertist-footer_button')?.addEventListener('click', () => {
			if (typeof test === 'function') {
				test(parsedHTML).then((res) => {
					if (res) {
						resolve(parsedHTML);
						parsedHTML.close();
					}
				});
			} else {
				resolve(parsedHTML);
				parsedHTML.close();
			}
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
