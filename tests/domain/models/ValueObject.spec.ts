import { MyVO, createMyVO } from './fakes/MyVO';

// Globals
let x: MyVO;
let y: MyVO;
let z: MyVO;

beforeEach(() => {
  x = createMyVO('Test', 0);
  y = createMyVO('Test', 0);
  z = createMyVO('Test', 1);
});

test('Test value object immutability', () => {
  // Shouldn't change.
  expect(() => {
    x.props.name = 'Tryna change';
  }).toThrow(TypeError);
});

test('Test value object equality', () => {
  // X and Y are the same value, but distinct objects.
  expect(x.equals(y)).toBe(true);
  expect(x.equals(z)).toBe(false);
});
