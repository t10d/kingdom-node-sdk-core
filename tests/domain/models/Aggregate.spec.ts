import { EntityDiscardedError } from '../../../src/domain/exceptions/EntityDiscardedError';
import { MyAggregate, createMyAggregate } from './fakes/MyAggregate';
import { MyEntity, createMyEntity } from './fakes/MyEntity';

// Globals
let entity: MyEntity;
let x: MyAggregate;
let y: MyAggregate;
let z: MyAggregate;

beforeEach(() => {
  entity = createMyEntity('Test');
  x = createMyAggregate(entity, 1);
  y = createMyAggregate(entity, 1);
  z = createMyAggregate(entity, 2);
});

test('Test aggregate hash and equality', () => {
  // All are different, distinc ids.
  expect(x.equals(y)).toBe(false);
  expect(x.equals(z)).toBe(false);

  // Enforced equal ids should check the equality.
  x._id = y._id;
  expect(x.equals(y)).toBe(true);

  // After change, should be different.
  x.counter += 1;
  expect(x.counter).toEqual(2);
  expect(x.equals(y)).toBe(false);
});

test('Test aggreagete string representation', () => {
  expect(typeof x.toString()).toEqual('string');
  expect(typeof x.reference.toString()).toEqual('string');
});

test('Test aggregate reference access', () => {
  const nameBefore = x.reference.name;
  x.reference.name = "It's been changed";

  // Should've be changed.
  expect(nameBefore !== x.reference.name).toBe(true);

  // Shouldn't be able to change private fields.
  expect(() => {
    x.version = 1;
  }).toThrow(TypeError);
  expect(() => {
    x.reference.version = 1;
  }).toThrow(TypeError);
});

test('Test discard aggregate', () => {
  const updatedAtBefore = x.updatedAt;

  // After discard, the timestamp should be updated.
  x.discard();
  expect(x.updatedAt.getTime()).toBeGreaterThanOrEqual(updatedAtBefore.getTime());

  // Any commit after the discard should throw an exception.
  expect(() => {
    x.counter = 10;
    x.update();
  }).toThrow(EntityDiscardedError);
});
