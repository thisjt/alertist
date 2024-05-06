import init, { bucket, cleanup, buttons } from './init';

const handler = (type, params, alertbody) => {
	init();

	let fixedParams = {
		title: '',
		text: '',
		button: 'OK',
		okCallback: () => {},
		cancelCallback: () => {},
		check: () => {
			return true;
		},
	};
	if (params[0] && typeof params[0] === 'object' && !Array.isArray(params[0])) {
		fixedParams = { ...fixedParams, ...params[0] };
	} else {
		switch (params.length) {
			case 1:
				fixedParams.text = params[0];
				break;
			case 6:
				fixedParams.check = params[5];
			case 5:
				fixedParams.cancelCallback = params[4];
			case 4:
				fixedParams.okCallback = params[3];
			case 3:
				if (typeof params[2] == 'function') {
					fixedParams.okCallback = params[2];
				} else {
					fixedParams.button = params[2];
				}
			case 2:
				fixedParams.title = params[0];
				fixedParams.text = params[1];
				break;
			case 0:
				console.warn('alertjs: alert - Not enough parameters. Needs at least 1.');
				break;
			default:
				console.warn('alertjs: alert - Too many parameters. Max of 5 only.');
				break;
		}
	}

	const { title, text, button, okCallback, cancelCallback, check } = fixedParams;

	let parsedHTML = new DOMParser().parseFromString(alertbody, 'text/html').querySelector('dialog');
	parsedHTML.querySelector('.alertjs-title').textContent = title;
	parsedHTML.querySelector('.alertjs-body').textContent = text;
	parsedHTML.querySelector('.alertjs-title_close').setAttribute('src', buttons.close);
	parsedHTML.querySelector('.alertjs-footer_button').textContent = button;
	parsedHTML.querySelector('.alertjs-footer_button').addEventListener('click', (e) => {
		Promise.resolve(check).then((executeCallback) => {
			if (executeCallback) {
				parsedHTML.close();
				okCallback();
				cleanup();
			}
		});
	});
	const cancelCallbackFn = () => {
		parsedHTML.close();
		cancelCallback();
		cleanup();
	};
	parsedHTML.querySelector('.alertjs-footer_cancelbutton')?.addEventListener('click', cancelCallbackFn);
	parsedHTML.querySelector('.alertjs-title_close').addEventListener('click', cancelCallbackFn);
	parsedHTML.addEventListener('click', (e) => {
		if (e.target.tagName === 'DIALOG') {
			cancelCallbackFn();
		}
	});

	bucket.append(parsedHTML);
	parsedHTML.showModal();
};

export default handler;
