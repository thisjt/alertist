import alertFn, { alertbody } from './alert';
import confirmFn, { confirmbody } from './confirm';
import formFn, { formbody } from './form';
import { buttons } from './init';

/**
 * @module alertist
 * @description
 * A simple alert management system built on top of the native "dialog" HTML tag.
 * @example
 * import alertist from 'alertist';
 * alertist.alert({ text: 'Hello, World!' });
 * alertist.confirm({ text: 'Hello, World!' });
 * @returns {Object} alertist
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
