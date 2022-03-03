import MessageProps from '../../interfaces/MessageProps';
import ValueObject from '../models/ValueObject';

/**
 * Base class for all commands and events.
 */
export default abstract class Message<Props_T extends MessageProps> extends ValueObject<Props_T> {}
