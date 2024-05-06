import alertFn from './alert';
import confirmFn from './confirm';
import { cleanup } from './init';

const alertjs = {
	alert: alertFn,
	confirm: confirmFn,
	cleanup,
};

export default alertjs;
