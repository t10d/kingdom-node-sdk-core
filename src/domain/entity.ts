import objectHash from 'object-hash';
import EntityDiscardedError from './exceptions/EntityDiscardedError';

/**
 * Represent the base element in the domain model, for entities and its aggregates.
 */
export default abstract class Entity<T> {
  private _id: T;

  private _version: number;

  private _isDiscarded: boolean;

  private _registeredAt: Date;

  private _updatedAt: Date;

  /**
   * Create an Entity.
   *
   * @param {T} id - Unique identifier.
   * @param {number} version - Value used to handle optmistic concurrency.
   * @param {boolean} is_discarded - Flag used by the no-deletion convention.
   * @param {Date} registered_at - Timestamp when the entity had created.
   * @param {Date} updated_at - Timestamp when the last modification had done.
   */
  public constructor(
    id: T,
    version: number,
    isDiscarded: boolean,
    registeredAt: Date,
    updatedAt: Date,
  ) {
    this._id = id;
    this._version = version;
    this._isDiscarded = isDiscarded;
    this._registeredAt = registeredAt;
    this._updatedAt = updatedAt;
  }

  /**
   * Call this method before every update action.
   */
  private _check_not_discarded() {
    if (this._isDiscarded) {
      const classname = this.constructor.name;
      throw new EntityDiscardedError(`${classname} object is discarded`);
    }
  }

  /**
   * Use this method in the toString() implementation.
   */
  protected baseRepr(identifier: string, kwargs?: any): string {
    const prefix = this._isDiscarded ? '**DISCARDED** ' : '';
    const classname = this.constructor.name;
    const extra = kwargs ? '()' : '';
    return `${prefix}<${classname} '${identifier}'${extra}>`;
  }

  public abstract toString(): string;

  public equals(other: any): boolean {
    if (!(other instanceof Entity)) {
      return false;
    }
    return this.toHash() === other.toHash();
  }

  public toHash(): string {
    return objectHash({
      ...this,
      _version: null,
      _isDiscarded: null,
      _registeredAt: null,
      _updatedAt: null,
    });
  }

  public get id(): T {
    return this._id;
  }

  public get version(): number {
    return this._version;
  }

  public get isDiscarded(): boolean {
    return this._isDiscarded;
  }

  public get registeredAt(): Date {
    return this._registeredAt;
  }

  public get updatedAt(): Date {
    return this._updatedAt;
  }

  /**
   * Remember to call this method before commiting a change.
   */
  public update() {
    this._check_not_discarded();
    this._update();
  }

  private _update() {
    this._version += 1;
    this._updatedAt = new Date();
  }

  /**
   * By convention, isn't necessary delete an object, only mark it as discarded.
   */
  public discard() {
    this._isDiscarded = true;
    this._update();
  }
}
