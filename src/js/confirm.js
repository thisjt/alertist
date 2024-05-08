import handler from './handler';

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

const confirmFn = (...params) => {
	return handler('confirm', params, confirmbody);
};

export default confirmFn;
export { confirmbody };
