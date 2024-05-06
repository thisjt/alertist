var alertjs = (function () {
	'use strict';

	let bucket;

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
			console.warn('alertjs: init - Not in a browser environment.');
			return false;
		}
		let bucketSelector = document.querySelector('.alertjs-bucket');
		if (!bucketSelector) {
			bucketSelector = document.createElement('span');
			bucketSelector.classList.add('alertjs-bucket');
			document.querySelector('body').append(bucketSelector);
		}
		bucket = bucketSelector;
		return bucketSelector;
	};

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
					console.warn('alertjs: alert - Not enough parameters. Needs at least 1.');
					break;
				default:
					console.warn('alertjs: alert - Too many parameters. Max of 5 only.');
					break;
			}
		}

		const { title, text, button, cancel, okCallback, cancelCallback, check } = fixedParams;

		let parsedHTML = new DOMParser().parseFromString(alertbody, 'text/html').querySelector('dialog');
		parsedHTML.querySelector('.alertjs-title').textContent = title;
		parsedHTML.querySelector('.alertjs-body').textContent = text;
		parsedHTML.querySelector('.alertjs-title_close img').setAttribute('src', buttons.close);
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

		if (type === 'confirm') {
			parsedHTML.querySelector('.alertjs-footer_cancelbutton').textContent = cancel;
			parsedHTML.querySelector('.alertjs-footer_cancelbutton').addEventListener('click', cancelCallbackFn);
		}
		parsedHTML.querySelector('.alertjs-title_close').addEventListener('click', cancelCallbackFn);
		parsedHTML.addEventListener('click', (e) => {
			if (e.target.tagName === 'DIALOG') {
				cancelCallbackFn();
			}
		});

		let cfcos = {
			x: 0,
			y: 0,
		};
		parsedHTML.querySelector('.alertjs-title').addEventListener('dragstart', (e) => {
			cfcos.x ||= e.clientX;
			cfcos.y ||= e.clientY;
		});

		parsedHTML.querySelector('.alertjs-title').addEventListener('dragend', (e) => {});

		let dragThrottlerInt = 1;
		const dragThrottler = (e) => {
			parsedHTML.setAttribute('style', `transform: translate(${-cfcos.x + e.clientX}px, ${-cfcos.y + e.clientY}px)`);
		};

		parsedHTML.querySelector('.alertjs-title').addEventListener('drag', (e) => {
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

	const alertbody = /*html*/ `
	<dialog class="alertjs alertjs-alert" style="transform: translate(0px, 0px)">
		<div class="alertjs-container">
			<div class="alertjs-header">
				<div class="alertjs-title" draggable="true"></div>
				<button class="alertjs-title_close"><img></button>
			</div>
			<div class="alertjs-body"></div>
			<div class="alertjs-footer">
				<button class="alertjs-footer_button"></button>
			</div>
		</div>
	</dialog>`;

	const alertFn = (...params) => {
		handler('alert', params, alertbody);
	};

	const confirmbody = /*html*/ `
	<dialog class="alertjs alertjs-confirm" style="transform: translate(0px, 0px)">
		<div class="alertjs-container">
			<div class="alertjs-header">
				<div class="alertjs-title" draggable="true"></div>
				<button class="alertjs-title_close"><img></button>
			</div>
			<div class="alertjs-body"></div>
			<div class="alertjs-footer">
				<button class="alertjs-footer_button"></button>
				<button class="alertjs-footer_cancelbutton"></button>
			</div>
		</div>
	</dialog>`;

	const confirmFn = (...params) => {
		handler('confirm', params, confirmbody);
	};

	const alertjs = {
		alert: alertFn,
		confirm: confirmFn,
		cleanup,
	};

	return alertjs;

})();