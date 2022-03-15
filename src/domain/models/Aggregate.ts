import { AnyEvent } from '../aliases';
import { Entity } from './Entity';

/**
 * Base class for aggregates.
 */
export abstract class Aggregate<Id_T> extends Entity<Id_T> {
  private _events: AnyEvent[];

  public constructor(
    id: Id_T,
    version: number,
    isDiscarded: boolean,
    registeredAt: Date,
    updatedAt: Date,
  ) {
    super(id, version, isDiscarded, registeredAt, updatedAt);
    this._events = [];
  }

  public addEvents(...events: AnyEvent[]) {
    this.check_not_discarded();
    this._events.push(...events);
  }

  public hasEvents(): boolean {
    return this._events.length > 0;
  }

  public nextEvent(): AnyEvent | undefined {
    return this._events.shift();
  }
}
