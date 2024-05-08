import alertFn, { alertbody } from './alert';
import confirmFn, { confirmbody } from './confirm';
import { cleanup, buttons } from './init';

const alertist = {
	alert: alertFn,
	confirm: confirmFn,
	custom: {
		buttons,
		alertbody,
		confirmbody,
	},
};

export default alertist;
