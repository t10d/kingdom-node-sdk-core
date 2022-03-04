import { createMyEvent } from './fakes/MyEvent';

test('Test event raising', () => {
  const now = new Date();
  const x = createMyEvent(now, 1, 0);
  const y = createMyEvent(now, 1, 0);
  const z = createMyEvent(now, 2, 0);

  // Content set.
  expect(x.props.raisedAt).toEqual(now);
  expect(x.props.raisedBy).toEqual(1);
  expect(x.props.delay).toEqual(0);

  // Equality.
  expect(x.equals(y)).toBe(true);
  expect(x.equals(z)).toBe(false);

  // Shouldn't be able to change.
  expect(() => {
    x.props.delay = 1;
  }).toThrow(TypeError);
});
