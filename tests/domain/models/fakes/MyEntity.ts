import { v4 as uuidv4 } from 'uuid';
import Entity from '../../../../src/domain/models/Entity';

export class MyEntity extends Entity<string> {
  private _name: string;

  public constructor(
    id: string,
    version: number,
    isDiscarded: boolean,
    registeredAt: Date,
    updatedAt: Date,
    name: string,
  ) {
    super(id, version, isDiscarded, registeredAt, updatedAt);
    this._name = name;
  }

  override toString(): string {
    return this.baseRepr(this.id, { name: this._name });
  }

  public get name(): string {
    return this._name;
  }

  public set name(value: string) {
    this._name = value;
  }
}

export function createMyEntity(name: string): MyEntity {
  const now = new Date();
  return new MyEntity(uuidv4(), 0, false, now, now, name);
}
