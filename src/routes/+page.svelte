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
	<div>Toast Examples</div>
	<div>
		<button
			on:click={async () => {
				const action = await alertist.toast({ text: `Hello! The current time is ${new Date().toLocaleString()}.` });
				alertist.alert({ text: `Toast closed by ${action ? 'user' : 'timeout'}!` });
			}}>Basic</button>
		<button
			on:click={() => {
				alertist.toast({ text: `Hello! The current time is ${new Date().toLocaleString()}.`, closebutton: true });
			}}>With X Button</button>
		<button
			on:click={() => {
				alertist.toast({ text: `Hello! The current time is ${new Date().toLocaleString()}.`, timeout: 1000 });
			}}>1 Second Timeout</button>
		<button
			on:click={() => {
				alertist.toast({ text: `Hello! The current time is ${new Date().toLocaleString()}.`, closebutton: true, closeonclick: false });
			}}>No Close on Click</button>
	</div>
</div>
