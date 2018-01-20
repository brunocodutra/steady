import * as classes from 'classnames';
import * as React from 'react';

import {Phasor as PhasorType} from 'lib/phasor';
import {Unit} from 'lib/unit';

import Phasor from 'component/phasor';

type Props = {
  readonly value: PhasorType,
  readonly unit: Unit,
};

export default ({value, unit}: Props) => (
  <span className={'quantity'}>
    <Phasor value={value}/>
    <span className={classes('unit', unit)}/>
  </span>
);
