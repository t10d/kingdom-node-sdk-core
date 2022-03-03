import Event from '../../../src/domain/messages/Event';

class MyEvent extends Event<
  number,
  { readonly raisedAt: Date; readonly raisedBy: number; readonly delay: number }
> {}

test('Test Event raising', () => {
  const now = new Date();
  const x = new MyEvent({ raisedAt: now, raisedBy: 1, delay: 0 });
  const y = new MyEvent({ raisedAt: now, raisedBy: 1, delay: 0 });
  const z = new MyEvent({ raisedAt: now, raisedBy: 2, delay: 0 });

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
