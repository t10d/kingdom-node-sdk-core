import MessageProps from './MessageProps';

export default interface EventProps<Id_T> extends MessageProps {
  readonly raisedBy: Id_T;
}
