import ValueObject from '../../../src/domain/models/ValueObject';

class MyVO extends ValueObject<{
  name: string;
  value: number;
}> {}

test('Test value object immutability', () => {
  const x = new MyVO({ name: 'Test', value: 0 });

  // Shouldn't change.
  expect(() => {
    x.props.name = 'Tryna change';
  }).toThrow(TypeError);
});

test('Test value object equality', () => {
  const x = new MyVO({ name: 'Test', value: 0 });
  const y = new MyVO({ name: 'Test', value: 0 });
  const z = new MyVO({ name: 'Test', value: 1 });

  // X and Y are the same value, but distinct objects.
  expect(x.equals(y)).toBe(true);
  expect(x.equals(z)).toBe(false);
});
