import handler from './handler';

const formbody = /*html*/ `
	<dialog class="alertist alertist-alert" style="transform: translate(0px, 0px)">
		<div class="alertist-container">
			<div class="alertist-header">
				<div class="alertist-title" draggable="true"></div>
				<button class="alertist-title_close"><img></button>
			</div>
			<div class="alertist-body alertist-wordbreak"></div>
			<div class="alertist-footer">
				<button class="alertist-footer_button"></button>
			</div>
		</div>
	</dialog>`;

/**
 * @param {Object} confirm
 * @param {string|Object} confirm.target - Target of the form/element to be pulled to the alertist dialog box
 * @param {string} confirm.title - Title of the Alert Box
 * @param {function} confirm.okCallback - Function that gets called after user clicks OK
 * @param {function} confirm.cancelCallback - Function that gets called after user clicks the X button or the backdrop
 * @param {function} confirm.check - Runs before the okCallback. Return false or Promise.reject() keeps the confirm open and okCallback will not run
 * @returns {Object|false} - Returns the Dialog DOM element of the Alert Box. Returns false if not in browser environment
 */
const formFn = (...params) => {
	return handler('form', params, formbody);
};
