var alertist = (function () {
	'use strict';

	let bucket;

	const buttons = {
		close:
			'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAMAAACelLz8AAAAElBMVEX///9HcEz///////////////84chYNAAAABnRSTlP9ABWejzIjLOoFAAAAlUlEQVQoz3VSWRbEIAwi2/2vPG5tg8nohz6JBBFIhDRjnEIB0xt' +
			'QB2LMik1kADIXZ8xXOUTtuqcbEXzbB3lK8RIQ29zgLdz9EgWYJJODRElui9zcSRBIGEkFPyc/EOwBXCq0L3WEW3Ur4xxa8hrkKHkNMqMa9dfe7lN8fcqFfPQQr+E4AWhjYziJasJmK1ERWhOqI6I/koMDV9q/Is8AAAAASUVORK5CYII=',
	};

	const cleanup = () => {
		if (bucket) {
			bucket.querySelectorAll('dialog:not([open])').forEach((elem) => elem.remove());
		}
	};

	const init = () => {
		if (typeof document !== 'object' || typeof DOMParser !== 'function') {
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
	};

	/**
	 * @param {"alert"|"confirm"|"form"} type
	 * @param {} params
	 * @param {string} alertbody
	 * @returns
	 */
	const handler = (type, params, alertbody) => {
		if (!init()) {
			console.warn('alertist: init - Not in a browser environment.');
			return false;
		}

		let fixedParams = {
			target: null,
			title: '',
			text: '',
			type: '',
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

		const { title, text, type: boxType, button, cancel, okCallback, cancelCallback, check, target, submit, titleClass } = fixedParams;

		let parsedHTML = new DOMParser().parseFromString(alertbody, 'text/html').querySelector('dialog');

		parsedHTML.querySelector('.alertist-title').textContent = title;

		if (titleClass.length) {
			const titleClassExploded = titleClass.split(' ');
			titleClassExploded.forEach((titleClassNode) => {
				parsedHTML.querySelector('.alertist-title').classList.add(titleClassNode);
			});
		}

		if (boxType === 'error') {
			parsedHTML.querySelector('.alertist-title').classList.add('alertist-title_error');
			parsedHTML.querySelector('.alertist-title_close').classList.add('alertist-title_error_close');
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

	const alertbody = /*html*/ `
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

	/**
	 * @param {object} alert
	 * @param {string} [alert.title] - Title of the Alert Box
	 * @param {string} alert.text - Text body of the Alert Box
	 * @param {"error"|undefined} [alert.type] - Type of the Alert Box. Only "error" supported for now
	 * @param {string} [alert.button] - OK Button text of the Alert Box
	 * @param {function} [alert.okCallback] - Function that gets called after user clicks OK
	 * @param {function} [alert.cancelCallback] - Function that gets called after user clicks the X button or the backdrop
	 * @param {function} [alert.check] - Runs before the okCallback. Return false or Promise.reject() keeps the alert open and okCallback will not run
	 */
	const alertFn = (alert) => {
		return handler('alert', alert, alertbody);
	};

	const confirmbody = /*html*/ `
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

	/**
	 * @param {object} confirm
	 * @param {string} [confirm.title] - Title of the Confirm Box
	 * @param {string} confirm.text - Text body of the Confirm Box
	 * @param {"error"|undefined} [alert.type] - Type of the Confirm Box. Only "error" supported for now
	 * @param {string} [confirm.button] - OK Button text of the Confirm Box
	 * @param {string} [confirm.cancel] - Cancel button text of the Confirm Box
	 * @param {function} [confirm.okCallback] - Function that gets called after user clicks OK
	 * @param {function} [confirm.cancelCallback] - Function that gets called after user clicks Cancel, X, or the backdrop
	 * @param {function} [confirm.check] - Runs before the okCallback. Return false or Promise.reject() keeps the confirm open and okCallback will not run
	 * @returns {object|false} - Returns the Dialog DOM element of the Confirm Box. Returns false if not in browser environment
	 */
	const confirmFn = (confirm) => {
		return handler('confirm', confirm, confirmbody);
	};

	const formbody = /*html*/ `
	<dialog class="alertist alertist-form" style="transform: translate(0px, 0px)">
		<div class="alertist-container">
			<div class="alertist-header">
				<div class="alertist-title" draggable="true"></div>
				<button class="alertist-title_close"><img></button>
			</div>
			<!-- .alertist-body -->
		</div>
	</dialog>`;

	/**
	 * @param {object} confirm
	 * @param {string} confirm.title - Title of the dialog box
	 * @param {string|object} confirm.target - Target of the form/element to be pulled to the alertist dialog box
	 * @param {boolean} confirm.submit - If true, will trigger form.submit() when check succeeds
	 * @param {function} confirm.okCallback - Function that gets called after user clicks OK
	 * @param {function} confirm.cancelCallback - Function that gets called after user clicks the X button or the backdrop
	 * @param {function} confirm.check - Runs before the okCallback. Return false or Promise.reject() keeps the confirm open and okCallback will not run
	 * @returns {object|false} - Returns the Dialog DOM element of the Alert Box. Returns false if not in browser environment
	 */
	const formFn = (confirm) => {
		return handler('form', confirm, formbody);
	};

	const alertist = {
		alert: alertFn,
		confirm: confirmFn,
		form: formFn,
		custom: {
			buttons,
			alertbody,
			confirmbody,
			formbody,
		},
	};

	return alertist;

})();
