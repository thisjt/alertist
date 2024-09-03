<script>
	import alertist from '$lib/alertist';

	let /**@type {HTMLDivElement}*/ bodyMe;
</script>

<div class="examples">
	<div>HTML Examples - <a href="./">Back</a></div>
	<div>
		<button
			on:click={async () => {
				const action = await alertist.html({
					text: 'This is a test.',
					title: 'The Usual',
				});
			}}>Basic</button>
		<button
			on:click={async () => {
				const action = await alertist.html({
					text: bodyMe,
					title: 'The Usual',
				});
			}}>Custom Element</button>
		<button
			on:click={async () => {
				const action = await alertist.html({
					text: 'Click OK after you click Yes. This needs to be long so that you can see it from the background.<br>More long text shenanigans.',
					title: 'Hmmm',
					button: 'Yes',
					test: async (dialog) => {
						return new Promise((res) => {
							alertist
								.confirm({
									text: 'Click OK now!',
									title: 'Test!',
								})
								.then((conf) => {
									if (conf === null) return;
									res(true);
								});
						});
					},
				});
			}}>With Test</button>
	</div>

	<div style="border:1px solid #faa" bind:this={bodyMe}>
		You will see me in the Custom Element!<br />
		<button style="background-color:#000;color:#fff" on:click={() => alert('basic alert? huh?')}>Clickable</button>
	</div>
</div>
