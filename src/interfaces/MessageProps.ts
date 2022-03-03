import Props from './Props';

export default interface MessageProps extends Props {
  readonly raisedAt: Date;
  readonly delay: number;
}
