import alertFn from './alert';
import confirmFn from './confirm';
import { cleanup } from './init';

const alertist = {
	alert: alertFn,
	confirm: confirmFn,
	cleanup,
};

export default alertist;
