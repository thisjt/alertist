import handler from './handler';

const alertbody = /*html*/ `
	<dialog class="alertist alertist-alert" style="transform: translate(0px, 0px)">
		<div class="alertist-container">
			<div class="alertist-header">
				<div class="alertist-title" draggable="true"></div>
				<button class="alertist-title_close"><img></button>
			</div>
			<div class="alertist-body"></div>
			<div class="alertist-footer">
				<button class="alertist-footer_button"></button>
			</div>
		</div>
	</dialog>`;

const alertFn = (...params) => {
	handler('alert', params, alertbody);
};

export default alertFn;
