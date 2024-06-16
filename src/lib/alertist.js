import alertifyAlert from './alert/alert';
import alertifyConfirm from './confirm/confirm';

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
};

export default alertist;
