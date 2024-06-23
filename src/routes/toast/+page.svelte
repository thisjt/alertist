<script>
	import alertist from '$lib/alertist';
</script>

<div class="examples">
	<div>Toast Examples - <a href="../">Back</a></div>
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
