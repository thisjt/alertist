/**
 * Converts a string to an HTMLElement.
 * @param {string} string
 * @returns {HTMLElement} HTMLElement
 */
export function alertistStringToHtml(string: string): HTMLElement;
/**
 * Initializes the alertist bucket.
 * @returns {null | true}
 */
export function alertistInit(): null | true;
/**
 * Cleans up the alertist bucket.
 * @returns {void} void
 */
export function alertistCleanup(): void;
/**@type {HTMLElement | null} */
export let alertistBucket: HTMLElement | null;
/**@type {HTMLElement | null} */
export let alertistToastBucket: HTMLElement | null;
export namespace alertistButtons {
    let close: string;
}
//# sourceMappingURL=util.d.ts.map