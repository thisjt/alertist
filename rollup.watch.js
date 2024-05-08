import http from 'http';
import scss from 'rollup-plugin-scss';

function watchLoader() {
	return {
		name: 'watchLoader',
		watchChange() {
			fetch('http://localhost:32578/trigger');
		},
	};
}

export default [
	{
		input: 'src/js/main.js',
		output: {
			name: 'alertist',
			file: 'dev/alertist.browser.js',
			format: 'iife',
		},
		plugins: [watchLoader(), scss({ fileName: './dev/alertist.css' })],
	},
];

let args = process.argv;
if (args[2] === '--reload') {
	let watchcounter = new Date().getTime();
	http
		.createServer(function (req, res) {
			res.setHeader('Access-Control-Allow-Origin', '*');
			res.setHeader('Access-Control-Allow-Methods', 'GET');
			res.setHeader('Access-Control-Max-Age', 2592000);

			if (req.url == '/watch') {
				res.write(JSON.stringify(watchcounter));
			} else if (req.url == '/trigger') {
				res.write('ok');
				watchcounter = new Date().getTime();
			} else {
				res.write('hi');
			}
			res.end();
		})
		.listen(32578);
}
