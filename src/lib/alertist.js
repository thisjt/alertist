import alertistAlert from './alert/alert';
import alertistConfirm from './confirm/confirm';
import alertistPrompt from './prompt/prompt';
import alertistToast from './toast/toast';
import alertistHtml from './html/html';

/**
 * @namespace Alertist
 */
/**
 * @module Alertist
 * @description
 * A simple alert management system built on top of the native "dialog" HTML tag.
 * @example
 * import alertist from 'alertist';
 * alertist.alert({ text: 'Hello, World!' });
 * // Check https://npmjs.com/package/alertist for more examples
 * @returns {Alertist} Object that contains the alertist library methods
 */
const alertist = {
	alert: alertistAlert,
	confirm: alertistConfirm,
	prompt: alertistPrompt,
	toast: alertistToast,
	html: alertistHtml,
};

export default alertist;
