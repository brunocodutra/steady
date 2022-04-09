import classes from 'classnames';
import React from 'react';
import { pretty } from 'lib/number';
import { Phasor } from 'lib/phasor';
import { degrees, normalize, Scale, Unit } from 'lib/unit';

interface Props {
  readonly value: Phasor,
  readonly unit?: Unit,
}

export default ({ value, unit }: Props): JSX.Element => {
  const [mag, scale] = normalize(value.norm());
  const ang = degrees(value.angle());

  return (
    <span className={'quantity'}>
      <span className='mag'>{pretty(mag)}</span>
      <span className='ang'>{pretty(ang)}</span>
      <span className={classes('prefix', Scale[scale])} />
      {!unit ? null : (
        <span className={classes('unit', unit)} />
      )}
    </span>
  );
}
