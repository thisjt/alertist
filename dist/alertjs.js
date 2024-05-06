const alertjs = {
	elements: {
		/**
		 * Elements Storage Container.
		 * If you don't have syntax highlighting for template literals, I suggest
		 * you download the VSCode extension: tobermory.es6-string-html
		 */
		x: 'iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAMAAACelLz8AAAAElBMVEX///9HcEz///////////////84chYNAAAABnRSTlP9ABWejzIjLOoFAAAAlUlEQVQoz3VSWRbEIAwi2/2vPG5tg8nohz6JBBFIhDRjnEIB0xtQB2LMik1kADIXZ8xXOUTtuqcbEXzbB3lK8RIQ29zgLdz9EgWYJJODRElui9zcSRBIGEkFPyc/EOwBXCq0L3WEW3Ur4xxa8hrkKHkNMqMa9dfe7lN8fcqFfPQQr+E4AWhjYziJasJmK1ERWhOqI6I/koMDV9q/Is8AAAAASUVORK5CYII=',

		confirm: /*html*/ `
			<dialog class="alertjs alertjs-confirm">
				<div class="alertjs-container">
					<div class="alertjs-header">
						<div class="alertjs-title"></div>
						<button class="alertjs-title_close"><img src="data:image/png;base64,"></button>
					</div>
					<div class="alertjs-body"></div>
					<div class="alertjs-footer">
						<button class="alertjs-footer_cancelbutton"></button>
						<button class="alertjs-footer_okbutton"></button>
					</div>
				</div>
			</dialog>`,
		prompt: /*html*/ ``,
	},
	bucket: null,

	/**
	 * @param  {...any} params Accepts either an object with 5 variables or 5 parameters.
	 * Accepted parameter examples:
	 * text
	 * title, text
	 * title, text, button
	 * title, text, okCallback
	 * title, text, button, okCallback, cancelCallback
	 */
	alert: (...params) => {
		const alerthtml =
			/*html*/ `
			<dialog class="alertjs alertjs-alert">
				<div class="alertjs-container">
					<div class="alertjs-header">
						<div class="alertjs-title"></div>
						<button class="alertjs-title_close"><img src="data:image/png;base64,` +
			alertjs.elements.x +
			`"></button>
					</div>
					<div class="alertjs-body"></div>
					<div class="alertjs-footer">
						<button class="alertjs-footer_button"></button>
					</div>
				</div>
			</dialog>`;

		let fixedParams = {
			title: '',
			text: '',
			button: 'OK',
			okCallback: () => {},
			cancelCallback: () => {},
		};
		if (params[0] && typeof params[0] === 'object' && !Array.isArray(params[0])) {
			fixedParams = { ...fixedParams, ...params[0] };
		} else {
			switch (params.length) {
				case 1:
					fixedParams.text = params[0];
					break;
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

		const { title, text, button, okCallback, cancelCallback } = fixedParams;

		let parsedHTML = new DOMParser().parseFromString(alerthtml, 'text/html').querySelector('dialog');
		parsedHTML.querySelector('.alertjs-title').textContent = title;
		parsedHTML.querySelector('.alertjs-body').textContent = text;
		parsedHTML.querySelector('.alertjs-footer_button').textContent = button;
		parsedHTML.querySelector('.alertjs-footer_button').addEventListener('click', (e) => {
			parsedHTML.close();
			okCallback();
			this.cleanup();
		});
		parsedHTML.querySelector('.alertjs-title_close').addEventListener('click', (e) => {
			parsedHTML.close();
			cancelCallback();
			this.cleanup();
		});
	},

	cleanup: () => {
		// this.bucket.querySelectorAll('dialog:not([open])').forEach((elem) => elem.remove());
	},

	init: () => {
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
		alertjs.bucket = bucketSelector;
		return bucketSelector;
	},
};

alertjs.init();

export default alertjs;
