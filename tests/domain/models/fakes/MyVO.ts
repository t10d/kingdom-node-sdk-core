import ValueObject from '../../../../src/domain/models/ValueObject';

export class MyVO extends ValueObject<{
  name: string;
  value: number;
}> {}

export function createMyVO(name: string, value: number): MyVO {
  return new MyVO({ name, value });
}
