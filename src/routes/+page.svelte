<script>
	import alertist from '$lib/alertist';
</script>

<div class="examples">
	<div><h1>Alertist</h1></div>
	<div>
		A simple alert management system built on top of the<br />
		native <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog" target="_blank"><code>dialog</code></a> HTML tag.<br />
		<br />
		<a href="https://github.com/thisjt/alertist" target="_blank">GitHub</a> -
		<a href="https://www.npmjs.com/package/alertist" target="_blank">NPM Package</a> -
		<a href="https://unpkg.com/alertist" target="_blank">Unpkg</a>
	</div>
	<div>Basic Usage</div>
	<div>
		<button
			on:click={() => {
				alertist
					.alert({
						title: 'Hello!',
						text: 'This is a test!',
					})
					.then(() => {
						console.log('hi!');
					});
			}}>Click Me!</button>
	</div>
	<div>
		Try more examples:<br />
		<a href="alert">Alert</a> -
		<a href="confirm">Confirm</a> -
		<a href="prompt">Prompt</a> -
		<a href="toast">Toast</a>
	</div>
</div>
