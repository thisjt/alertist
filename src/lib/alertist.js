import alertifyAlert from './alert/alert';

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
};

export default alertist;
