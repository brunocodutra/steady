import * as classes from 'classnames';
import * as React from 'react';

import {Phasor, toPolar, toRect} from 'phasor';
import {Prefix} from 'unit';

const toFixed = (x: number, d = 3) => !x
  ? x.toFixed(d - 1)
  : x.toFixed(Math.floor(Math.log((10 ** d - 1) / x) * Math.LOG10E))
;

type Props = {
  readonly value: Phasor,
};

export default ({value}: Props) => {
  const {mag, ang} = toPolar(toRect(value));

  const [m, p] = (
      (mag < 1E-15)
    ? [toFixed(0), Prefix.mono]
    : (mag < 1E-12)
    ? [`${toFixed(mag / 1E-15)}`, Prefix.femto]
    : (mag < 1E-09)
    ? [`${toFixed(mag / 1E-12)}`, Prefix.pico]
    : (mag < 1E-06)
    ? [`${toFixed(mag / 1E-09)}`, Prefix.nano]
    : (mag < 1E-03)
    ? [`${toFixed(mag / 1E-06)}`, Prefix.micro]
    : (mag < 1E+00)
    ? [`${toFixed(mag / 1E-03)}`, Prefix.milli]
    : (mag < 1E+03)
    ? [`${toFixed(mag / 1E+00)}`, Prefix.mono]
    : (mag < 1E+06)
    ? [`${toFixed(mag / 1E+03)}`, Prefix.kilo]
    : (mag < 1E+09)
    ? [`${toFixed(mag / 1E+06)}`, Prefix.mega]
    : (mag < 1E+12)
    ? [`${toFixed(mag / 1E+09)}`, Prefix.giga]
    : (mag < 1E+15)
    ? [`${toFixed(mag / 1E+012)}`, Prefix.tera]
    : (mag < 1E+18)
    ? [`${toFixed(mag / 1E+015)}`, Prefix.peta]
    : ['\u00a0∞\u00a0', Prefix.mono]
  );

  const a = Math.round(ang * 180 / Math.PI);

  return (
    <span className='phasor'>
      <span className='mag'>{m}</span>
      <span className='ang'>{a}</span>
      <span className={classes('prefix', p)}/>
    </span>
  );
};
