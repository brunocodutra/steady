import React from 'react';

import parametric, { Props as PropsBase } from 'container/parametric';

import Status from 'component/status';
import Tile from 'component/tile';
import Value from 'component/value';

import { Admittance } from 'lib/element';
import { Unit } from 'lib/unit';

export const Icon = require('icon/admittance.svg');

type Props = PropsBase<Admittance>;

export default parametric<Admittance>(
  ({ vi: [v, i], element, active, activate, remove, update }: Props) => (
    <Tile active={active} activate={activate} remove={remove} className={element.kind}>
      <Icon />
      <Value value={element.value} description={'shunt impedance'} unit={Unit.ohm} onChange={update} />
      <Status value={v} unit={Unit.volt} />
      <Status value={i} unit={Unit.ampere} />
    </Tile>
  ),
);
