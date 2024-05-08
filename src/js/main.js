import alertFn, { alertbody } from './alert';
import confirmFn, { confirmbody } from './confirm';
import formFn, { formbody } from './form';
import { cleanup, buttons } from './init';

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
