import { v4 as uuidv4 } from 'uuid';
import Entity from '../src/domain/entity';
import EntityDiscardedError from '../src/domain/exceptions/EntityDiscardedError';

class MyEntity extends Entity<string> {
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
    return this.baseRepr(this.id);
  }

  public get name(): string {
    return this._name;
  }

  public set name(value: string) {
    this._name = value;
  }
}

function createMyEntity(name: string): MyEntity {
  const now = new Date();
  return new MyEntity(uuidv4(), 0, false, now, now, name);
}

test('Test entity hash and equality', () => {
  const x = createMyEntity('Loren Ipsum');
  const y = createMyEntity('Loren Ipsum');

  // The distinct objects shouldn't be equal because the id are different.
  expect(x.equals(y)).toEqual(false);

  // If enforced the same id, they'd be the same.
  x._id = y._id;
  expect(x.equals(y)).toEqual(true);

  // As the control attributes don't matter, after update the timestamp the objects should keep
  // the equality.
  x.update();
  expect(x.equals(y)).toEqual(true);

  // Change a custom attribute should reflect the equality.
  x.name = 'Dolor et';
  x.update();
  expect(x.equals(y)).toEqual(false);
});

test('Test discard entity', () => {
  const x = createMyEntity('Loren Ipsum');
  const updatedAtBefore = x.updatedAt;

  // After discard, the timestamp should be updated.
  x.discard();
  expect(x.updatedAt.getTime()).toBeGreaterThanOrEqual(updatedAtBefore.getTime());

  // Any commit after the discard should throw an exception.
  expect(() => {
    x.name = 'Tryna change';
    x.update();
  }).toThrow(EntityDiscardedError);
});
