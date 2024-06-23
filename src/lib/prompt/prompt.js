import { alertistBucket, alertistStringToHtml, alertistInit, alertistButtons, alertistRandomString } from '../util';

/**
 * Displays a Prompt Box using the Alertist library.
 * @param {Object} options
 * @param {string} options.text - Text body of the Prompt Box
 * @param {string} [options.title] - Title of the Prompt Box
 * @param {"error"} [options.custom] - Title bar customization
 * @param {"input" | "textarea" | "password" | "checkbox"} [options.type] - Type of the Prompt Box
 * @param {string} [options.placeholder] - Placeholder text of the Prompt Box
 * @param {string} [options.button] - OK Button text of the Prompt Box
 * @param {string} [options.cancel] - Cancel button text of the Prompt Box
 * @returns {Promise<string | boolean | null>} `Promise<string | null>` - returns the typed string if the user clicked OK, `null` if the user clicked Cancel or closed the dialog
 * @example
 * import alertist from 'alertist';
 * alertist.prompt({ text: 'Hello!' });
 */
export default async function alertistPrompt({ text, title, custom, type, placeholder, button, cancel }) {
	alertistInit();

	const randomString = alertistRandomString();

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
						<label class="alertist-input-container" for="alertist-input-${randomString}">
							<input type="text" id="alertist-input-${randomString}">
							<textarea></textarea>
						</label>
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
		case 'checkbox':
			inputElement.type = 'checkbox';
			inputElement.parentElement.classList.add('alertist-checkbox');
			textareaElement.remove();
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
			if (inputMainElement.type === 'checkbox') {
				resolve(inputMainElement.checked);
			} else {
				resolve(inputMainElement.value);
			}
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
