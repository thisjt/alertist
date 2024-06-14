import alertFn, { alertbody } from './alert';
import confirmFn, { confirmbody } from './confirm';
import formFn, { formbody } from './form';
import { buttons } from './init';

/**
 * @type {object} Alertist - A simple alert management system built on top of the native "dialog" HTML tag.
 * @property {function} alert - Alert Box function
 * @property {function} confirm - Confirm Box function
 * @property {object} custom - Customization options
 * @property {object} custom.buttons - Custom button icons
 * @property {string} custom.alertbody - Custom Alert Box HTML
 * @property {string} custom.confirmbody - Custom Confirm Box HTML
 * @example
 * import alertist from 'alertist';
 * alertist.alert({ text: 'Hello, World!' });
 * alertist.confirm({ text: 'Hello, World!' });
 */
const alertist = {
	alert: alertFn,
	confirm: confirmFn,
	form: formFn,
	custom: {
		buttons,
		alertbody,
		confirmbody,
		formbody,
	},
};

export default alertist;
