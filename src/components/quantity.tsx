import * as classes from 'classnames';
import * as React from 'react';

import {isPhasor, Phasor as TPhasor} from 'phasor';
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
      isPhasor(value)
      ? <Phasor value={value}/>
      : <Number value={value}/>
    }
    <span className={classes('unit', unit)}/>
  </span>
);
