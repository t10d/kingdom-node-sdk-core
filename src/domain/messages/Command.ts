import { MessageProps } from '../../interfaces/MessageProps';
import { Message } from './Message';

/**
 * Base domain command.
 */
export abstract class Command<Props_T extends MessageProps> extends Message<Props_T> {}
