import { Props } from './Props';

export interface MessageProps extends Props {
  readonly raisedAt: Date;
  readonly delay: number;
}
