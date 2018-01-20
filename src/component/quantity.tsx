import * as classes from 'classnames';
import * as React from 'react';

import {angle, norm, Phasor} from 'lib/phasor';
import {Prefix, Unit} from 'lib/unit';

const pretty = (x: number, d = 3): string => {
  const f = d - 1 - Math.min(Math.max(Math.floor(Math.log10(x)), 0), d - 1);
  const k = 10 ** f;
  return (Math.floor(x * k) / k).toFixed(f);
};

const mag = (p: Phasor) => {
  const m = norm(p);

  return (
      (m < Prefix.femto)
    ? pretty(0)
    : (m < Prefix.pico)
    ? pretty(m / Prefix.femto)
    : (m < Prefix.nano)
    ? pretty(m / Prefix.pico)
    : (m < Prefix.micro)
    ? pretty(m / Prefix.nano)
    : (m < Prefix.milli)
    ? pretty(m / Prefix.micro)
    : (m < Prefix.mono)
    ? pretty(m / Prefix.milli)
    : (m < Prefix.kilo)
    ? pretty(m / Prefix.mono)
    : (m < Prefix.mega)
    ? pretty(m / Prefix.kilo)
    : (m < Prefix.giga)
    ? pretty(m / Prefix.mega)
    : (m < Prefix.tera)
    ? pretty(m / Prefix.giga)
    : (m < Prefix.peta)
    ? pretty(m / Prefix.tera)
    : (m < Prefix.exa)
    ? pretty(m / Prefix.peta)
    : '\u00a0∞\u00a0'
  );
};

const ang = (p: Phasor): string => (angle(p) * 180 / Math.PI).toFixed(0);

const prefix = (p: Phasor): Prefix => {
  const m = norm(p);

  return (
      (m < Prefix.femto)
    ? Prefix.mono
    : (m < Prefix.pico)
    ? Prefix.femto
    : (m < Prefix.nano)
    ? Prefix.pico
    : (m < Prefix.micro)
    ? Prefix.nano
    : (m < Prefix.milli)
    ? Prefix.micro
    : (m < Prefix.mono)
    ? Prefix.milli
    : (m < Prefix.kilo)
    ? Prefix.mono
    : (m < Prefix.mega)
    ? Prefix.kilo
    : (m < Prefix.giga)
    ? Prefix.mega
    : (m < Prefix.tera)
    ? Prefix.giga
    : (m < Prefix.peta)
    ? Prefix.tera
    : (m < Prefix.exa)
    ? Prefix.peta
    : Prefix.mono
  );
};

type Props = {
  readonly value: Phasor,
  readonly unit: Unit,
};

export default ({value, unit}: Props) => (
  <span className={'quantity'}>
    <span className='mag'>{mag(value)}</span>
    <span className='ang'>{ang(value)}</span>
    <span className={classes('prefix', Prefix[prefix(value)])}/>
    <span className={classes('unit', unit)}/>
  </span>
);
