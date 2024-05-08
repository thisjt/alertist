import http from 'http';
import chokidar from 'chokidar';

export default [
	{
		input: 'src/js/main.js',
		output: {
			name: 'alertist',
			file: 'dev/alertist.browser.js',
			format: 'iife',
		},
	},
];

let args = process.argv;
if (args[2] === '--watchloader') {
	let watchcounter = new Date().getTime();
	http
		.createServer(function (req, res) {
			res.setHeader('Access-Control-Allow-Origin', '*');
			res.setHeader('Access-Control-Allow-Methods', 'GET');
			res.setHeader('Access-Control-Max-Age', 2592000);

			if (req.url == '/watch') {
				res.write(JSON.stringify(watchcounter));
			} else {
				res.write('hi');
			}
			res.end();
		})
		.listen(32578);

	chokidar.watch('./dev').on('all', () => {
		console.log('Changes detected in "dev" folder. Refreshing...');
		watchcounter = new Date().getTime();
	});
}
