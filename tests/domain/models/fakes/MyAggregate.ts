import { v4 as uuidv4 } from 'uuid';
import { MyEntity } from './MyEntity';
import Aggregate from '../../../../src/domain/models/Aggregate';

export class MyAggregate extends Aggregate<string> {
  private _reference: MyEntity;

  private _counter: number;

  public constructor(
    id: string,
    version: number,
    isDiscarded: boolean,
    registeredAt: Date,
    updatedAt: Date,
    reference: MyEntity,
    counter: number,
  ) {
    super(id, version, isDiscarded, registeredAt, updatedAt);
    this._counter = counter;
    this._reference = reference;
  }

  override toString(): string {
    return this.baseRepr(this.id);
  }

  public get reference(): MyEntity {
    return this._reference;
  }

  public get counter(): number {
    return this._counter;
  }

  public set counter(value: number) {
    this._counter = value;
  }
}

export function createMyAggregate(reference: MyEntity, counter: number): MyAggregate {
  const now = new Date();
  return new MyAggregate(uuidv4(), 0, false, now, now, reference, counter);
}
