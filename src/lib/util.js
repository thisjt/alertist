/**@type {HTMLElement | null} */
export let alertistBucket = null;

/**
 * Converts a string to an HTMLElement.
 * @param {string} string
 * @returns {HTMLElement} HTMLElement
 */
export function alertistStringToHtml(string) {
	const parser = new DOMParser();
	const doc = parser.parseFromString(string, 'text/html');
	return /**@type {HTMLElement}*/ (doc.body.firstChild);
}

/**
 * Initializes the alertist bucket.
 * @returns {HTMLElement | null} HTMLElement
 */
export function alertistInit() {
	if (typeof document !== 'object' || typeof DOMParser !== 'function') {
		return null;
	}
	let bucketSelector = /**@type {HTMLElement}*/ (document.querySelector('.alertist-bucket'));
	if (!bucketSelector) {
		bucketSelector = document.createElement('span');
		bucketSelector.classList.add('alertist-bucket');
		document.querySelector('body')?.append(bucketSelector);
		alertistBucket = bucketSelector;
	}
	return bucketSelector;
}

/**
 * Cleans up the alertist bucket.
 * @returns {void} void
 */
export function alertistCleanup() {
	if (alertistBucket) {
		alertistBucket.querySelectorAll('dialog:not([open])').forEach((elem) => elem.remove());
	}
}

export const alertistButtons = {
	close:
		'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAMAAACelLz8AAAAElBMVEX///9HcEz///////////////84chYNAAAABnRSTlP9ABWejzIjLOoFAAAAlUlEQVQoz3VSWRbEIAwi2/2vPG5tg8nohz6JBBFIhDRjnEIB0xt' +
		'QB2LMik1kADIXZ8xXOUTtuqcbEXzbB3lK8RIQ29zgLdz9EgWYJJODRElui9zcSRBIGEkFPyc/EOwBXCq0L3WEW3Ur4xxa8hrkKHkNMqMa9dfe7lN8fcqFfPQQr+E4AWhjYziJasJmK1ERWhOqI6I/koMDV9q/Is8AAAAASUVORK5CYII=',
};
