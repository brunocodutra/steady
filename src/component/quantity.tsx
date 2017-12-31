import * as classes from 'classnames';
import * as React from 'react';

import {isPhasor, Phasor as PhasorT} from 'lib/phasor';
import {Unit} from 'lib/unit';

import Number from 'component/number';
import Phasor from 'component/phasor';

type Props = {
  readonly value: PhasorT | number,
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
