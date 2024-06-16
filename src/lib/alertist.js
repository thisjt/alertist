import alertifyAlert from './alert/alert';
import alertifyConfirm from './confirm/confirm';
import alertifyPrompt from './prompt/prompt';

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
	alert: alertifyAlert,
	confirm: alertifyConfirm,
	prompt: alertifyPrompt,
};

export default alertist;
