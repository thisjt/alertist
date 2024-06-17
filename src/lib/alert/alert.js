import { alertistBucket, alertistStringToHtml, alertistInit, alertistButtons } from '../util';

/**
 * Displays an Alert Box using the Alertify library.
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
export default async function alertifyAlert({ text, title, custom, button }) {
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
