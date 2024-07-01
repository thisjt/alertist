<script>
	import alertist from '$lib/alertist';
</script>

<div class="examples">
	<div>Alert Examples - <a href="./">Back</a></div>
	<div>
		<button
			on:click={() => {
				alertist.alert({
					title: 'Hello!',
					text: 'This is a test!',
				});
			}}>Basic</button>

		<button
			on:click={() => {
				alertist.alert({
					text: 'This is a test! This is a long text! This is a test! This is a long text! This is a test! This is a long text!',
				});
			}}>Long Text</button>
	</div>
</div>
