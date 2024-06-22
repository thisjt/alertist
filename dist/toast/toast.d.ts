/**
 * Displays a Toast Notification using the Alertist library.
 * @param {Object} options
 * @param {string} options.text - Text body of the Toast Notification
 * @param {false} [options.closeonclick] - Close the Toast Notification when clicked. Defaults to true.
 * @param {true} [options.closebutton] - Show a close button on the Toast Notification
 * @param {number} [options.timeout] - Time in milliseconds before the Toast Notification closes itself. Defaults to 5000ms. 0ms will make the toast persist.
 * @param {string} [options.type] - Type of the Toast Notification. Can be 'success', 'error', 'warning', 'info'
 * @returns {Promise<true | null>} `Promise<true | null>` - returns `true` if the toast notification was clicked. `null` if the the toast was closed by timeout.
 * @example
 * import alertist from 'alertist';
 * alertist.toast({ text: 'Hello!' });
 *
 * // Be careful with setting timeout:0, closeonclick:false, and closebutton:false. This will make the toast permanently persist until a page refresh happens.
 */
export default function alertistToast({ text, closeonclick, closebutton, timeout, type }: {
    text: string;
    closeonclick?: false;
    closebutton?: true;
    timeout?: number;
    type?: string;
}): Promise<true | null>;
//# sourceMappingURL=toast.d.ts.map