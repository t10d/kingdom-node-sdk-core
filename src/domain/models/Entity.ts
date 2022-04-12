import objectHash from 'object-hash';
import { EntityDiscardedError } from '../exceptions/EntityDiscardedError';
import { Props } from '../../interfaces/Props';

export interface IEntity<Id_T> {
  id?: Id_T;
  version?: number;
  isDiscarded?: boolean;
  registeredAt?: Date;
  updatedAt?: Date;
}

/**
 * Represent the base element in the domain model, for entities and its aggregates.
 */
export abstract class Entity<Id_T> implements IEntity<Id_T> {
  private _id: Id_T;

  private _version: number;

  private _isDiscarded: boolean;

  private _registeredAt: Date;

  private _updatedAt: Date;

  /**
   * Create an Entity.
   *
   * @param {Id_T} id - Unique identifier.
   * @param {number} version - Value used to handle optmistic concurrency.
   * @param {boolean} is_discarded - Flag used by the no-deletion convention.
   * @param {Date} registered_at - Timestamp when the entity had created.
   * @param {Date} updated_at - Timestamp when the last modification had done.
   */
  public constructor(
    id: Id_T,
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
  protected check_not_discarded() {
    if (this._isDiscarded) {
      const classname = this.constructor.name;
      throw new EntityDiscardedError(`${classname} object is discarded`);
    }
  }

  /**
   * Use this method in the toString() implementation.
   */
  protected baseRepr(identifier: string, props?: Props): string {
    const pairs = Object.entries(props || {})
      .map(item => `${item[0]}="${item[1]}"`)
      .join(', ');

    const prefix = this._isDiscarded ? '**DISCARDED** ' : '';
    const classname = this.constructor.name;
    const extra = props ? ` (${pairs})` : '';

    return `${prefix}<${classname} '${identifier}'${extra}>`;
  }

  public abstract toString(): string;

  /**
   * Default hashing operation.
   *
   * You shuold override it on every subclass.
   */
  public toHash(): string {
    return objectHash({
      ...this,
      _version: null,
      _isDiscarded: null,
      _registeredAt: null,
      _updatedAt: null,
    });
  }

  /**
   * Default equality operation.
   *
   * You shuold override it on every subclass.
   */
  public equals(other: any): boolean {
    if (!(other instanceof Entity)) {
      return false;
    }
    return this.toHash() === other.toHash();
  }

  public get id(): Id_T {
    return this._id;
  }

  /**
   * Required by ORM to auto generate the ID.
   */
  public set id(value: Id_T) {
    this._id = value;
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

  public get props(): Props {
    const objectProps = {};
    Object.keys(this).forEach(key => {
      if (key.charAt(0) === '_') {
        /* @ts-ignore */
        objectProps[key.substring(1)] = this[key];
      }
    });
    return Object.freeze(objectProps);
  }

  /**
   * Remember to call this method before commiting a change.
   */
  public update() {
    this.check_not_discarded();
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
