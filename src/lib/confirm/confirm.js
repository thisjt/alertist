import { alertistBucket, alertistStringToHtml, alertistInit, alertistButtons } from '../util';

/**
 * Displays a Confirm Box using the Alertify library.
 * @param {Object} options
 * @param {string} options.text - Text body of the Confirm Box
 * @param {string} [options.title] - Title of the Confirm Box
 * @param {"error"} [options.type] - Type of the Confirm Box. Only "error" supported for now
 * @param {string} [options.button] - OK Button text of the Confirm Box
 * @param {string} [options.cancel] - Cancel button text of the Confirm Box
 * @returns {Promise<boolean | null>} Promise&lt;boolean&gt; - true if the user clicked OK, false if the user clicked Cancel or closed the dialog
 * @example
 * import alertist from 'alertist';
 * alertist.confirm({ text: 'Hello!' });
 */
export default async function alertifyConfirm({ text, title, type, button, cancel }) {
	if (!alertistInit()) {
		console.error('alertist: init - not in a browser environment.');
		return null;
	}

	const parsedHTML = /**@type {HTMLDialogElement} */ (
		alertistStringToHtml(/*html*/ `
			<dialog class="alertist alertist-confirm">
				<div class="alertist-container">
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

	if (type === 'error') {
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
			resolve(false);
			parsedHTML.close();
		});

		parsedHTML.querySelector('.alertist-title_close')?.addEventListener('click', () => {
			resolve(false);
			parsedHTML.close();
		});

		parsedHTML.addEventListener('keydown', (e) => {
			const event = /**@type {KeyboardEvent}*/ (e);
			if (event.key === 'Escape') {
				e.preventDefault();
				resolve(false);
				parsedHTML.close();
			}
		});

		parsedHTML.addEventListener('close', () => {
			parsedHTML.remove();
		});
	});
}
