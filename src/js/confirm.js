import handler from './handler';

const confirmbody = /*html*/ `
	<dialog class="alertist alertist-confirm" style="transform: translate(0px, 0px)">
		<div class="alertist-container">
			<div class="alertist-header">
				<div class="alertist-title" draggable="true"></div>
				<button class="alertist-title_close"><img></button>
			</div>
			<div class="alertist-body"></div>
			<div class="alertist-footer">
				<button class="alertist-footer_button"></button>
				<button class="alertist-footer_cancelbutton"></button>
			</div>
		</div>
	</dialog>`;

const confirmFn = (...params) => {
	handler('confirm', params, confirmbody, confirmswitch);
};

const confirmswitch = (params, fixedParams) => {
	let paramcode = '';
	params.forEach((param) => {
		paramcode += typeof param === 'string' ? 's' : typeof param === 'function' ? 'f' : 'x';
	});

	switch (paramcode) {
		case 'ssfff':
			fixedParams.check = params[4];
		case 'ssff':
			fixedParams.cancelCallback = params[3];
		case 'ssf':
			fixedParams.okCallback = params[2];
			fixedParams.text = params[1];
			fixedParams.title = params[0];
			break;

		case 'sssfff':
			fixedParams.check = params[5];
		case 'sssff':
			fixedParams.cancelCallback = params[4];
		case 'sssf':
			fixedParams.okCallback = params[3];
			fixedParams.button = params[2];
			fixedParams.text = params[1];
			fixedParams.title = params[0];
			break;

		case 'ssssfff':
			fixedParams.check = params[6];
		case 'ssssff':
			fixedParams.cancelCallback = params[5];
		case 'ssssf':
			fixedParams.okCallback = params[4];
		case 'ssss':
			fixedParams.cancel = params[3];
		case 'sss':
			fixedParams.button = params[2];
		case 'ss':
			fixedParams.text = params[1];
			fixedParams.title = params[0];
			break;

		case 'sfff':
			fixedParams.check = params[3];
		case 'sff':
			fixedParams.cancelCallback = params[2];
		case 'sf':
			fixedParams.okCallback = params[1];
		case 's':
			fixedParams.text = params[0];
			break;

		case '':
			console.warn('alertist: confirm - Not enough parameters or found invalid parameters. Needs at least 1.');
			break;

		default:
			console.warn('alertist: confirm - Too many parameters or found invalid parameters. Max of 7 only.');
			break;
	}

	return fixedParams;
};

export default confirmFn;
export { confirmswitch, confirmbody };
