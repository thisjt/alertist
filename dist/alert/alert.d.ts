/**
 * Displays an Alert Box using the Alertist library.
 * @param {Object} options
 * @param {string} options.text - Text body of the Alert Box
 * @param {string} [options.title] - Title of the Alert Box
 * @param {"error"} [options.custom] - Title bar customization. Only `error` supported for now
 * @param {string} [options.button] - OK Button text of the Alert Box
 * @returns {Promise<void>} `Promise<void>`
 * @example
 * ```js
 * import alertist from 'alertist';
 * alertist.alert({ text: 'Hello!' });
 * ```
 */
export default function alertistAlert({ text, title, custom, button }: {
    text: string;
    title?: string;
    custom?: "error";
    button?: string;
}): Promise<void>;
//# sourceMappingURL=alert.d.ts.map