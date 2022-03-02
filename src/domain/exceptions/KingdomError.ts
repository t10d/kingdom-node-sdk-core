export default class KingdomError extends Error {
  private _code: string;

  public constructor(message: string, code: string) {
    super(message);
    this._code = code;
  }
}
