import { alertistToastBucket, alertistStringToHtml, alertistInit, alertistButtons } from '../util';

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
export default async function alertistToast({ text, closeonclick, closebutton, timeout, type }) {
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
