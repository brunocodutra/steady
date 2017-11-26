import * as classes from 'classnames';
import * as React from 'react';

import {angle, norm, Phasor} from 'phasor';
import {Prefix} from 'unit';

const toFixed = (x: number, d = 3) => !x
  ? x.toFixed(d - 1)
  : x.toFixed(Math.floor(Math.log((10 ** d - 1) / x) * Math.LOG10E))
;

type Props = {
  readonly value: Phasor,
};

export default ({value}: Props) => {
  const ang = Math.round(angle(value) * 180 / Math.PI);

  const [mag, prefix] = ((m: number): [string, Prefix] => (
      (m < 1E-15)
    ? [toFixed(0), Prefix.mono]
    : (m < 1E-12)
    ? [`${toFixed(m / 1E-15)}`, Prefix.femto]
    : (m < 1E-09)
    ? [`${toFixed(m / 1E-12)}`, Prefix.pico]
    : (m < 1E-06)
    ? [`${toFixed(m / 1E-09)}`, Prefix.nano]
    : (m < 1E-03)
    ? [`${toFixed(m / 1E-06)}`, Prefix.micro]
    : (m < 1E+00)
    ? [`${toFixed(m / 1E-03)}`, Prefix.milli]
    : (m < 1E+03)
    ? [`${toFixed(m / 1E+00)}`, Prefix.mono]
    : (m < 1E+06)
    ? [`${toFixed(m / 1E+03)}`, Prefix.kilo]
    : (m < 1E+09)
    ? [`${toFixed(m / 1E+06)}`, Prefix.mega]
    : (m < 1E+12)
    ? [`${toFixed(m / 1E+09)}`, Prefix.giga]
    : (m < 1E+15)
    ? [`${toFixed(m / 1E+12)}`, Prefix.tera]
    : (m < 1E+18)
    ? [`${toFixed(m / 1E+15)}`, Prefix.peta]
    : ['\u00a0∞\u00a0', Prefix.mono]
  ))(norm(value));

  return (
    <span className='phasor'>
      <span className='mag'>{mag}</span>
      <span className='ang'>{ang}</span>
      <span className={classes('prefix', prefix)}/>
    </span>
  );
};
