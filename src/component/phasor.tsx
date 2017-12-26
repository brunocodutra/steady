import * as classes from 'classnames';
import * as React from 'react';

import {angle, norm, Phasor} from 'lib/phasor';
import {Prefix} from 'lib/unit';

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
      (m < Prefix.femto)
    ? [toFixed(0), Prefix.mono]
    : (m < Prefix.pico)
    ? [`${toFixed(m / Prefix.femto)}`, Prefix.femto]
    : (m < Prefix.nano)
    ? [`${toFixed(m / Prefix.pico)}`, Prefix.pico]
    : (m < Prefix.micro)
    ? [`${toFixed(m / Prefix.nano)}`, Prefix.nano]
    : (m < Prefix.milli)
    ? [`${toFixed(m / Prefix.micro)}`, Prefix.micro]
    : (m < Prefix.mono)
    ? [`${toFixed(m / Prefix.milli)}`, Prefix.milli]
    : (m < Prefix.kilo)
    ? [`${toFixed(m / Prefix.mono)}`, Prefix.mono]
    : (m < Prefix.mega)
    ? [`${toFixed(m / Prefix.kilo)}`, Prefix.kilo]
    : (m < Prefix.giga)
    ? [`${toFixed(m / Prefix.mega)}`, Prefix.mega]
    : (m < Prefix.tera)
    ? [`${toFixed(m / Prefix.giga)}`, Prefix.giga]
    : (m < Prefix.peta)
    ? [`${toFixed(m / Prefix.tera)}`, Prefix.tera]
    : (m < Prefix.exa)
    ? [`${toFixed(m / Prefix.peta)}`, Prefix.peta]
    : ['\u00a0∞\u00a0', Prefix.mono]
  ))(norm(value));

  return (
    <span className='phasor'>
      <span className='mag'>{mag}</span>
      <span className='ang'>{ang}</span>
      <span className={classes('prefix', Prefix[prefix])}/>
    </span>
  );
};
