import { createMyCommand } from './fakes/MyCommand';

test('Test command raising', () => {
  const now = new Date();
  const x = createMyCommand(now, 0, '@1');
  const y = createMyCommand(now, 0, '@1');
  const z = createMyCommand(now, 0, '@2');

  // Content set.
  expect(x.props.raisedAt).toEqual(now);
  expect(x.props.delay).toEqual(0);
  expect(x.props.value).toEqual('@1');

  // Equality.
  expect(x.equals(y)).toBe(true);
  expect(x.equals(z)).toBe(false);

  // Shouldn't be able to change.
  expect(() => {
    x.props.value = '@3';
  }).toThrow(TypeError);
});
