import KingdomError from '../../../src/domain/exceptions/KingdomError';
import { MyError } from './fakes/MyError';

test('Test error throwing', () => {
  const { name } = MyError;
  const message = 'Test Error';
  const code = 'TEST_ERROR';

  try {
    throw new MyError(message, code);
  } catch (error) {
    expect(error).toBeInstanceOf(KingdomError);
    expect(error.name).toEqual(name);
    expect(error.message).toEqual(message);
    expect(error.code).toEqual(code);
    expect(error.toString()).toEqual(`${name}: ${message} [${code}]`);
    expect(error.stack).toContain(`${name}: ${message}`);
  }
});
