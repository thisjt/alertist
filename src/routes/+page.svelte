<script>
	import alertist from '$lib/alertist';
</script>

<div class="examples">
	<div>Alert Examples</div>
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
	<div>Confirm Examples</div>
	<div>
		<button>Basic</button>
		<button>Long Text</button>
		<button>Cancel Clicked</button>
	</div>
	<div>Prompt Examples</div>
	<div>
		<button>Basic</button>
		<button>Long Text</button>
		<button>Cancel Clicked</button>
	</div>
	<div>Toast Examples</div>
	<div>
		<button>Basic</button>
		<button>Click to Dismiss</button>
		<button>Callback</button>
		<button>Multiple/Stacking</button>
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
