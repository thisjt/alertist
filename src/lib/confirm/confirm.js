import { alertistBucket, alertistStringToHtml, alertistInit, alertistButtons } from '../util';

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
export default async function alertistConfirm({ text, title, custom, button, cancel }) {
	alertistInit();

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
