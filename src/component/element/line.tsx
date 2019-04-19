import React from 'react';

import parametric, { Props as PropsBase } from 'container/parametric';

import Status from 'component/status';
import Tile from 'component/tile';
import Value from 'component/value';

import { Line } from 'lib/element';
import { Unit } from 'lib/unit';

export const Icon = require('icon/line.svg');

type Props = PropsBase<Line>;

export default parametric<Line>(
  ({ vi: [v, i], element, active, activate, remove, update }: Props) => (
    <Tile active={active} activate={activate} remove={remove} className={element.kind}>
      <Icon />
      <Value
        name={'y'}
        value={element.value.y}
        description={'propagation constant'}
        onChange={(y) => update({ ...element.value, y })}
      />
      <Value
        name={'z'}
        value={element.value.z}
        description={'characteristic impedance'}
        unit={Unit.ohm}
        onChange={(z) => update({ ...element.value, z })}
      />
      <Status value={v} unit={Unit.volt} />
      <Status value={i} unit={Unit.ampere} />
    </Tile>
  ),
);
