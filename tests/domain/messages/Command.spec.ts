import Command from '../../../src/domain/messages/Command';

class MyCommand extends Command<{
  readonly raisedAt: Date;
  readonly delay: number;
  readonly value: string;
}> {}

test('Test Event raising', () => {
  const now = new Date();
  const x = new MyCommand({ raisedAt: now, delay: 0, value: '@1' });
  const y = new MyCommand({ raisedAt: now, delay: 0, value: '@1' });
  const z = new MyCommand({ raisedAt: now, delay: 0, value: '@2' });

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
