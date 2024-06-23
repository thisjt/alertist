<script>
	import alertist from '$lib/alertist';
</script>

<div class="examples">
	<div>Prompt Examples</div>
	<div>
		<button
			on:click={() => {
				alertist
					.prompt({
						title: 'Hello!',
						text: 'This is a test!',
						placeholder: 'Type something...',
					})
					.then((result) => {
						alertist.alert({
							title: 'Hello!',
							text: `You typed: ${result !== null ? result : '<i>canceled</i>'}`,
						});
					});
			}}>Basic</button>
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
			}}>Long Text</button>
		<button
			on:click={() => {
				alertist
					.prompt({
						title: 'Hello!',
						text: 'This is a test!',
						type: 'textarea',
						placeholder: 'Type something...',
					})
					.then((result) => {
						alertist.alert({
							title: 'Hello!',
							text: `You typed: ${result !== null ? result : '<i>canceled</i>'}`,
							custom: result === null ? 'error' : undefined,
						});
					});
			}}>Textarea</button>
		<button
			on:click={() => {
				alertist
					.prompt({
						title: 'Hello!',
						text: 'This is a test!',
						type: 'checkbox',
					})
					.then((result) => {
						alertist.alert({
							title: 'Hello!',
							text: `You did: ${result !== null ? result : '<i>canceled</i>'}`,
							custom: result === null ? 'error' : undefined,
						});
					});
			}}>Checkbox</button>
	</div>
</div>
