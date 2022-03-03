import objectHash from 'object-hash';
import Props from '../../interfaces/Props';

export default class ValueObject<T extends Props> {
  public readonly props: T;

  public constructor(props: T) {
    this.props = Object.freeze(props);
  }

  public toString(): string {
    const classname = this.constructor.name;
    const pairs = Object.entries(this.props)
      .map(item => `${item[0]}="${item[1]}"`)
      .join(', ');

    return `${classname}(${pairs})`;
  }

  public toHash(): string {
    return objectHash(this.props);
  }

  public equals(other: any): boolean {
    if (!(other instanceof ValueObject)) {
      return false;
    }
    return this.toHash() === other.toHash();
  }
}