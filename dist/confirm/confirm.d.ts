/**
 * Displays a Confirm Box using the Alertist library.
 * @param {Object} options
 * @param {string} options.text - Text body of the Confirm Box
 * @param {string} [options.title] - Title of the Confirm Box
 * @param {"error"} [options.custom] - Title bar customization. Only `error` supported for now
 * @param {string} [options.button] - OK Button text of the Confirm Box
 * @param {string} [options.cancel] - Cancel button text of the Confirm Box
 * @returns {Promise<true | null>} `Promise<true | null>` - `true` if the user clicked OK, `null` if the user clicked Cancel or closed the dialog
 * @example
 * ```js
 * import alertist from 'alertist';
 * alertist.confirm({ text: 'Hello!' });
 * ```
 */
export default function alertistConfirm({ text, title, custom, button, cancel }: {
    text: string;
    title?: string;
    custom?: "error";
    button?: string;
    cancel?: string;
}): Promise<true | null>;
//# sourceMappingURL=confirm.d.ts.map