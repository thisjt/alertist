import handler from './handler';

const alertbody = /*html*/ `
	<dialog class="alertjs alertjs-alert">
		<div class="alertjs-container">
			<div class="alertjs-header">
				<div class="alertjs-title"></div>
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

export default alertFn;
