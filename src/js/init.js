export let bucket;

export const buttons = {
	close:
		'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAMAAACelLz8AAAAElBMVEX///9HcEz///////////////84chYNAAAABnRSTlP9ABWejzIjLOoFAAAAlUlEQVQoz3VSWRbEIAwi2/2vPG5tg8nohz6JBBFIhDRjnEIB0xtQB2LMik1kADIXZ8xXOUTtuqcbEXzbB3lK8RIQ29zgLdz9EgWYJJODRElui9zcSRBIGEkFPyc/EOwBXCq0L3WEW3Ur4xxa8hrkKHkNMqMa9dfe7lN8fcqFfPQQr+E4AWhjYziJasJmK1ERWhOqI6I/koMDV9q/Is8AAAAASUVORK5CYII=',
};

export const cleanup = () => {
	if (bucket) {
		bucket.querySelectorAll('dialog:not([open])').forEach((elem) => elem.remove());
	}
};

const init = () => {
	if (typeof document !== 'object') {
		return false;
	}
	let bucketSelector = document.querySelector('.alertist-bucket');
	if (!bucketSelector) {
		bucketSelector = document.createElement('span');
		bucketSelector.classList.add('alertist-bucket');
		document.querySelector('body').append(bucketSelector);
	}
	bucket = bucketSelector;
	return bucketSelector;
};

export default init;
