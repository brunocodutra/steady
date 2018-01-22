import * as classes from 'classnames';
import * as React from 'react';

import {Phasor} from 'lib/phasor';
import {Unit} from 'lib/unit';

import Quantity from 'component/quantity';

type Props = {
  readonly name?: string,
  readonly value: Phasor,
  readonly unit: Unit,
};

export default ({name, value, unit}: Props) => (
  <span className={classes('value', name)}>
    <Quantity value={value} unit={unit}/>
  </span>
);
