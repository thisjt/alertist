import { alertistToastBucket, alertistStringToHtml, alertistInit } from '../util';

/**
 * Displays a Toast Notification using the Alertify library.
 * @param {Object} options
 * @param {string} options.text - Text body of the Toast Notification
 * @param {string} [options.title] - Title of the Toast Notification
 * @returns {Promise<true | null>} `Promise<true | null>` - returns `true` if the toast notification was clicked. `null` if the the toast was closed by itself.
 * @example
 * import alertist from 'alertist';
 * alertist.toast({ text: 'Hello!' });
 */
export default async function alertistToast({ text, title }) {
	if (!alertistInit()) {
		console.error('alertist: init - not in a browser environment.');
		return null;
	}

	const parsedHTML = /**@type {HTMLDivElement} */ (
		alertistStringToHtml(/*html*/ `
			<div class="alertist-toast-notification"></div>
		`)
	);

	parsedHTML.innerHTML = text;
	alertistToastBucket?.append(parsedHTML);
	setTimeout(() => {
		parsedHTML.classList.add('alertist-toast-notification-enter');
	});

	return new Promise((resolve) => {
		resolve(null);
	});
}
