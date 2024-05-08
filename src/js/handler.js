import init, { bucket, cleanup, buttons } from './init';

const handler = (type, params, alertbody, alertswitch) => {
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
		fixedParams = { ...fixedParams, ...alertswitch(params, fixedParams) };
	}

	const { title, text, button, cancel, okCallback, cancelCallback, check } = fixedParams;

	let parsedHTML = new DOMParser().parseFromString(alertbody, 'text/html').querySelector('dialog');
	parsedHTML.querySelector('.alertist-title').textContent = title;
	parsedHTML.querySelector('.alertist-body').innerHTML = text;
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
	parsedHTML.querySelector('.alertist-title_close').blur();
	return {
		parameters: fixedParams,
		element: parsedHTML,
	};
};

export default handler;
