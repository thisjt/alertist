import handler from './handler';

const confirmbody = /*html*/ `
	<dialog class="alertjs alertjs-confirm">
		<div class="alertjs-container">
			<div class="alertjs-header">
				<div class="alertjs-title"></div>
				<button class="alertjs-title_close"><img></button>
			</div>
			<div class="alertjs-body"></div>
			<div class="alertjs-footer">
				<button class="alertjs-footer_cancelbutton"></button>
				<button class="alertjs-footer_button"></button>
			</div>
		</div>
	</dialog>`;

const confirmFn = (...params) => {
	handler('confirm', params, confirmbody);
};

export default confirmFn;
