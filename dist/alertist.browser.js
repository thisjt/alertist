var alertist=(function(){'use strict';let bucket;

const buttons = {
	close:
		'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAMAAACelLz8AAAAElBMVEX///9HcEz///////////////84chYNAAAABnRSTlP9ABWejzIjLOoFAAAAlUlEQVQoz3VSWRbEIAwi2/2vPG5tg8nohz6JBBFIhDRjnEIB0xtQB2LMik1kADIXZ8xXOUTtuqcbEXzbB3lK8RIQ29zgLdz9EgWYJJODRElui9zcSRBIGEkFPyc/EOwBXCq0L3WEW3Ur4xxa8hrkKHkNMqMa9dfe7lN8fcqFfPQQr+E4AWhjYziJasJmK1ERWhOqI6I/koMDV9q/Is8AAAAASUVORK5CYII=',
};

const cleanup = () => {
	if (bucket) {
		bucket.querySelectorAll('dialog:not([open])').forEach((elem) => elem.remove());
	}
};

const init = () => {
	if (typeof document !== 'object') {
		return false;
	}
	let bucketSelector = document.querySelector('.alertist-bucket');
	if (!bucketSelector) {
		bucketSelector = document.createElement('span');
		bucketSelector.classList.add('alertist-bucket');
		document.querySelector('body').append(bucketSelector);
	}
	bucket = bucketSelector;
	return bucketSelector;
};const handler = (type, params, alertbody) => {
	if (!init()) {
		console.warn('alertist: init - Not in a browser environment.');
		return false;
	}

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
		console.warn('alertist: init - We are only accepting object as input.');
		return false;
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
};const alertbody = /*html*/ `
	<dialog class="alertist alertist-alert" style="transform: translate(0px, 0px)">
		<div class="alertist-container">
			<div class="alertist-header">
				<div class="alertist-title" draggable="true"></div>
				<button class="alertist-title_close"><img></button>
			</div>
			<div class="alertist-body alertist-wordbreak"></div>
			<div class="alertist-footer">
				<button class="alertist-footer_button"></button>
			</div>
		</div>
	</dialog>`;

const alertFn = (...params) => {
	return handler('alert', params, alertbody);
};const confirmbody = /*html*/ `
	<dialog class="alertist alertist-confirm" style="transform: translate(0px, 0px)">
		<div class="alertist-container">
			<div class="alertist-header">
				<div class="alertist-title" draggable="true"></div>
				<button class="alertist-title_close"><img></button>
			</div>
			<div class="alertist-body alertist-wordbreak"></div>
			<div class="alertist-footer">
				<button class="alertist-footer_button"></button>
				<button class="alertist-footer_cancelbutton"></button>
			</div>
		</div>
	</dialog>`;

const confirmFn = (...params) => {
	return handler('confirm', params, confirmbody);
};const alertist = {
	alert: alertFn,
	confirm: confirmFn,
	cleanup,
};return alertist;})();