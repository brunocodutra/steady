import * as classes from 'classnames';
import * as React from 'react';

import {Phasor as TPhasor} from 'phasor';
import {Unit} from 'unit';

import Number from 'components/number';
import Phasor from 'components/phasor';

type Props = {
  readonly value: TPhasor | number,
  readonly unit: Unit,
};

export default ({value, unit}: Props) => (
  <span className={'quantity'}>
    {
      (typeof value === 'number')
      ? <Number value={value}/>
      : <Phasor value={value}/>
    }
    <span className={classes('unit', unit)}/>
  </span>
);
