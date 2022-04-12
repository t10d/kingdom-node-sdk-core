import { AnyEvent } from '../aliases';
import { Entity, IEntity } from './Entity';

export interface IAggregate<Id_T> extends IEntity<Id_T> {}

/**
 * Base class for aggregates.
 */
export abstract class Aggregate<Id_T> extends Entity<Id_T> implements IAggregate<Id_T> {
  private readonly events: AnyEvent[];

  public constructor(
    id: Id_T,
    version: number,
    isDiscarded: boolean,
    registeredAt: Date,
    updatedAt: Date,
  ) {
    super(id, version, isDiscarded, registeredAt, updatedAt);
    this.events = [];
  }

  public addEvents(...events: AnyEvent[]) {
    this.check_not_discarded();
    this.events.push(...events);
  }

  public hasEvents(): boolean {
    return this.events.length > 0;
  }

  public nextEvent(): AnyEvent | undefined {
    return this.events.shift();
  }
}
