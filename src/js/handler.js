import init, { bucket, cleanup, buttons } from './init';

const handler = (type, params, alertbody) => {
	if (!init()) {
		console.warn('alertist: init - Not in a browser environment.');
		return false;
	}

	let fixedParams = {
		target: null,
		title: '',
		text: '',
		button: 'OK',
		cancel: 'Cancel',
		okCallback: () => {},
		cancelCallback: () => {},
		check: () => {
			return true;
		},
		titleClass: '',
	};
	if (params[0] && typeof params[0] === 'object' && !Array.isArray(params[0])) {
		fixedParams = { ...fixedParams, ...params[0] };
	} else {
		console.warn('alertist: init - We are only accepting object as input.');
		return false;
	}

	const { title, text, button, cancel, okCallback, cancelCallback, check, target, submit, titleClass } = fixedParams;

	let parsedHTML = new DOMParser().parseFromString(alertbody, 'text/html').querySelector('dialog');
	parsedHTML.querySelector('.alertist-title').textContent = title;
	if (titleClass.length) {
		const titleClassExploded = titleClass.split(' ');
		titleClassExploded.forEach((titleClassNode) => {
			parsedHTML.querySelector('.alertist-title').classList.add(titleClassNode);
		});
	}
	parsedHTML.querySelector('.alertist-title_close img').setAttribute('src', buttons.close);

	if (type === 'alert' || type === 'confirm') {
		parsedHTML.querySelector('.alertist-body').innerHTML = text;
		parsedHTML.querySelector('.alertist-footer_button').textContent = button;
		parsedHTML.querySelector('.alertist-footer_button').addEventListener('click', (e) => {
			const checkFn = check(parsedHTML);
			const isCheckAPromise = checkFn instanceof Promise;
			Promise.resolve(checkFn)
				.then((checker) => {
					if ((!isCheckAPromise && checker === true) || isCheckAPromise) {
						parsedHTML.close();
						okCallback();
						cleanup();
					}
				})
				.catch(() => {});
		});
	}
	if (type === 'form') {
		const targetElement = document.querySelector(target);
		if (!targetElement) {
			console.warn('alertist: form - Target not found in DOM.');
			return false;
		}

		parsedHTML.querySelector('.alertist-container').append(targetElement);
		targetElement.classList.add('alertist-body');
		targetElement.setAttribute('data-check', 'false');
		targetElement.addEventListener('submit', (e) => {
			if (targetElement.getAttribute('data-check') === 'false') {
				e.preventDefault();
				const checkFn = check(parsedHTML);
				const isCheckAPromise = checkFn instanceof Promise;
				Promise.resolve(checkFn)
					.then((checker) => {
						if ((!isCheckAPromise && checker === true) || isCheckAPromise) {
							parsedHTML.close();
							okCallback(parsedHTML);
							if (submit) {
								targetElement.setAttribute('data-check', 'true');
								targetElement.submit();
							}
							cleanup();
						}
					})
					.catch(() => {});
			}
		});
	}

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
