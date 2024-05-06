import init, { bucket, cleanup, buttons } from './init';

const handler = (type, params, alertbody) => {
	init();

	let fixedParams = {
		title: '',
		text: '',
		button: 'OK',
		cancel: 'Cancel',
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
				if (typeof params[3] === 'function') {
					fixedParams.okCallback = params[3];
				} else {
					fixedParams.cancel = params[3];
				}
			case 3:
				if (typeof params[2] === 'function') {
					fixedParams.okCallback = params[2];
				} else {
					fixedParams.button = params[2];
				}
			case 2:
				fixedParams.title = params[0];
				fixedParams.text = params[1];
				break;
			case 0:
				console.warn('alertist: alert - Not enough parameters. Needs at least 1.');
				break;
			default:
				console.warn('alertist: alert - Too many parameters. Max of 5 only.');
				break;
		}
	}

	const { title, text, button, cancel, okCallback, cancelCallback, check } = fixedParams;

	let parsedHTML = new DOMParser().parseFromString(alertbody, 'text/html').querySelector('dialog');
	parsedHTML.querySelector('.alertist-title').textContent = title;
	parsedHTML.querySelector('.alertist-body').textContent = text;
	parsedHTML.querySelector('.alertist-title_close img').setAttribute('src', buttons.close);
	parsedHTML.querySelector('.alertist-footer_button').textContent = button;
	parsedHTML.querySelector('.alertist-footer_button').addEventListener('click', (e) => {
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

	if (type === 'confirm') {
		parsedHTML.querySelector('.alertist-footer_cancelbutton').textContent = cancel;
		parsedHTML.querySelector('.alertist-footer_cancelbutton').addEventListener('click', cancelCallbackFn);
	}
	parsedHTML.querySelector('.alertist-title_close').addEventListener('click', cancelCallbackFn);
	parsedHTML.addEventListener('click', (e) => {
		if (e.target.tagName === 'DIALOG') {
			cancelCallbackFn();
		}
	});

	let cfcos = {
		x: 0,
		y: 0,
	};
	parsedHTML.querySelector('.alertist-title').addEventListener('dragstart', (e) => {
		cfcos.x ||= e.clientX;
		cfcos.y ||= e.clientY;
	});

	parsedHTML.querySelector('.alertist-title').addEventListener('dragend', (e) => {});

	let dragThrottlerInt = 1;
	const dragThrottler = (e) => {
		parsedHTML.setAttribute('style', `transform: translate(${-cfcos.x + e.clientX}px, ${-cfcos.y + e.clientY}px)`);
	};

	parsedHTML.querySelector('.alertist-title').addEventListener('drag', (e) => {
		e.preventDefault();
		if (e.screenX && dragThrottlerInt) {
			dragThrottlerInt = 0;
			dragThrottler(e);
			setTimeout(() => {
				dragThrottlerInt = 1;
			}, 16);
		}
	});

	bucket.append(parsedHTML);
	parsedHTML.showModal();
};

export default handler;
