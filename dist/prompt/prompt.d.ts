/**
 * Displays a Prompt Box using the Alertist library.
 * @param {Object} options
 * @param {string} options.text - Text body of the Prompt Box
 * @param {string} [options.title] - Title of the Prompt Box
 * @param {"error"} [options.custom] - Title bar customization
 * @param {"input" | "textarea" | "password"} [options.type] - Type of the Prompt Box. Can be `input` (default), `textarea`, or `password`
 * @param {string} [options.placeholder] - Placeholder text of the Prompt Box
 * @param {string} [options.button] - OK Button text of the Prompt Box
 * @param {string} [options.cancel] - Cancel button text of the Prompt Box
 * @returns {Promise<string | null>} `Promise<string | null>` - returns the typed string if the user clicked OK, `null` if the user clicked Cancel or closed the dialog
 * @example
 * import alertist from 'alertist';
 * alertist.prompt({ text: 'Hello!' });
 */
export default function alertistPrompt({ text, title, custom, type, placeholder, button, cancel }: {
    text: string;
    title?: string;
    custom?: "error";
    type?: "input" | "textarea" | "password";
    placeholder?: string;
    button?: string;
    cancel?: string;
}): Promise<string | null>;
//# sourceMappingURL=prompt.d.ts.map