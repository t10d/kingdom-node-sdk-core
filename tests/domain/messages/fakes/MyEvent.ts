import Event from '../../../../src/domain/messages/Event';

export class MyEvent extends Event<
  number,
  { readonly raisedAt: Date; readonly raisedBy: number; readonly delay: number }
> {}

export function createMyEvent(raisedAt: Date, raisedBy: number, delay: number): MyEvent {
  return new MyEvent({ raisedAt, raisedBy, delay });
}
