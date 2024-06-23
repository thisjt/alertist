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
</div>
