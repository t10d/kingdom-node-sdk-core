/**
 * Base application error class.
 *
 * Extends directly to global base ErrorConstructor.
 * Intellisense may fail and doesn't show the inherited fields from Error interface.
 *
 * @property {string} name - Error class name.
 * @property {string} message - Error message.
 * @property {string} code - Standartized error code.
 * @property {string?} stack - Error Stack trace.
 */
export class KingdomError extends Error {
  public code: string;

  public constructor(message: string, code: string) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
  }

  override toString(): string {
    return `${this.name}: ${this.message} [${this.code}]`;
  }
}
