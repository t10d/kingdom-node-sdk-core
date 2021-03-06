import { MessageProps } from './MessageProps';

export interface EventProps<Id_T> extends MessageProps {
  readonly raisedBy: Id_T;
}
