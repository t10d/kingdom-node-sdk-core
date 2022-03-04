import Command from '../../../../src/domain/messages/Command';

export class MyCommand extends Command<{
  readonly raisedAt: Date;
  readonly delay: number;
  readonly value: string;
}> {}

export function createMyCommand(raisedAt: Date, delay: number, value: string): MyCommand {
  return new MyCommand({ raisedAt, delay, value });
}
