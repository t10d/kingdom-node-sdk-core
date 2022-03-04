import EntityDiscardedError from '../../../src/domain/exceptions/EntityDiscardedError';
import { MyEntity, createMyEntity } from './fakes/MyEntity';

// Globals
let x: MyEntity;
let y: MyEntity;

beforeEach(() => {
  x = createMyEntity('Loren Ipsum');
  y = createMyEntity('Loren Ipsum');
});

test('Test entity hash and equality', () => {
  // The distinct objects shouldn't be equal because the id are different.
  expect(x.equals(y)).toBe(false);

  // If enforced the same id, they'd be the same.
  x._id = y._id;
  expect(x.equals(y)).toBe(true);

  // As the control attributes don't matter, after update the timestamp the objects should keep
  // the equality.
  x.update();
  expect(x.equals(y)).toBe(true);

  // Change a custom attribute should reflect the equality.
  x.name = 'Dolor et';
  x.update();
  expect(x.equals(y)).toBe(false);
});

test('Test entity string representation', () => {
  expect(typeof x.toString()).toEqual('string');
});

test('Test discard entity', () => {
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
