import handler from './handler';

const alertbody = /*html*/ `
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
 * @param {object} alert
 * @param {string} [alert.title] - Title of the Alert Box
 * @param {string} alert.text - Text body of the Alert Box
 * @param {"error"|undefined} [alert.type] - Type of the Alert Box. Only "error" supported for now
 * @param {string} [alert.button] - OK Button text of the Alert Box
 * @param {function} [alert.okCallback] - Function that gets called after user clicks OK
 * @param {function} [alert.cancelCallback] - Function that gets called after user clicks the X button or the backdrop
 * @param {function} [alert.check] - Runs before the okCallback. Return false or Promise.reject() keeps the alert open and okCallback will not run
 */
const alertFn = (...alert) => {
	return handler('alert', alert, alertbody);
};

export default alertFn;
export { alertbody };
