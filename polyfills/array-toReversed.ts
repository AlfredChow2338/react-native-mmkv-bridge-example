/**
 * Polyfill for Array.prototype.toReversed()
 * Required for Node.js versions < 20
 * This method was added in ES2023 and requires Node.js 20.0.0+
 */

if (!Array.prototype.toReversed) {
  Array.prototype.toReversed = function <T>(this: T[]): T[] {
    return [...this].reverse();
  };
}
