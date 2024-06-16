<script>
	import alertist from '$lib/alertist';
</script>

<div class="examples">
	<div>Alert Examples</div>
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
			}}>Basic</button>

		<button
			on:click={() => {
				alertist.alert({
					text: 'This is a test! This is a long text! This is a test! This is a long text! This is a test! This is a long text!',
				});
			}}>Long Text</button>
	</div>
	<div>Confirm Examples</div>
	<div>
		<button
			on:click={() => {
				alertist
					.confirm({
						title: 'Hello!',
						text: 'This is a test! This is a long text! This is a test! This is a long text! This is a test! This is a long text!',
						button: 'CustomOK',
						cancel: 'CustomCancel',
					})
					.then((result) => {
						alertist.alert({
							title: 'Hello!',
							text: result ? 'Confirmed!' : 'Cancelled!',
						});
					});
			}}>Basic</button>
	</div>
	<div>Prompt Examples</div>
	<div>
		<button
			on:click={() => {
				alertist
					.prompt({
						title: 'Hello!',
						text: 'This is a test! This is a long text! This is a test! This is a long text! This is a test! This is a long text!',
						placeholder: 'Type something...',
					})
					.then((result) => {
						alertist.alert({
							title: 'Hello!',
							text: `You typed: ${result !== null ? result : '<i>canceled</i>'}`,
						});
					});
			}}>Basic</button>
	</div>
	<div>Toast Examples</div>
	<div>
		<button>Basic</button>
		<button>Click to Dismiss</button>
	</div>
</div>

<style>
	.examples {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		height: 100vh;
	}

	.examples div {
		padding: 10px 0 5px 0;
	}

	button {
		margin: 0 10px;
		background-color: transparent;
		border: 2px solid #aaa;
		color: #fff;
		cursor: pointer;
		padding: 20px;
	}

	button:hover {
		background-color: #aaa;
	}
</style>
