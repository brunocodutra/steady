import * as React from 'react';

type Props = {
  readonly value: number,
};

export default ({value}: Props) => <span className='number'>{value}</span>;
