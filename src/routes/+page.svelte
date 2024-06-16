<script>
	import { browser } from '$app/environment';
	import alertist from '$lib/alertist';
</script>

<div class="examples">
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
				title: 'Hello!',
				text: 'This is a test! This is a long text! This is a test! This is a long text! This is a test! This is a long text!',
			});
		}}>Long Text</button>
</div>

<style>
	.examples {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
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
