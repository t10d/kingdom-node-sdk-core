import EventProps from '../../interfaces/EventProps';
import Message from './Message';

/**
 * Base domain event.
 */
export default abstract class Event<
  Id_T,
  Props_T extends EventProps<Id_T>,
> extends Message<Props_T> {}
