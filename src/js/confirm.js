import handler from './handler';

const confirmbody = /*html*/ `
	<dialog class="alertist alertist-confirm" style="transform: translate(0px, 0px)">
		<div class="alertist-container">
			<div class="alertist-header">
				<div class="alertist-title" draggable="true"></div>
				<button class="alertist-title_close"><img></button>
			</div>
			<div class="alertist-body alertist-wordbreak"></div>
			<div class="alertist-footer">
				<button class="alertist-footer_button"></button>
				<button class="alertist-footer_cancelbutton"></button>
			</div>
		</div>
	</dialog>`;

/**
 * @param {object} confirm
 * @param {string} [confirm.title] - Title of the Confirm Box
 * @param {string} confirm.text - Text body of the Confirm Box
 * @param {"error"} [confirm.type] - Type of the Confirm Box. Only "error" supported for now
 * @param {string} [confirm.button] - OK Button text of the Confirm Box
 * @param {string} [confirm.cancel] - Cancel button text of the Confirm Box
 * @param {function} [confirm.okCallback] - Function that gets called after user clicks OK
 * @param {function} [confirm.cancelCallback] - Function that gets called after user clicks Cancel, X, or the backdrop
 * @param {function} [confirm.check] - Runs before the okCallback. Return false or Promise.reject() keeps the confirm open and okCallback will not run
 * @returns {object|false} - Returns the Dialog DOM element of the Confirm Box. Returns false if not in browser environment
 */
const confirmFn = (confirm) => {
	return handler('confirm', confirm, confirmbody);
};

export default confirmFn;
export { confirmbody };

/*

*/
