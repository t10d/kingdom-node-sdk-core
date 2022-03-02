import KingdomError from './KingdomError';

export default class EntityDiscardedError extends KingdomError {
  public constructor(message: string) {
    super(message, 'ENTITY_DISCARDED_ERROR');
  }
}
