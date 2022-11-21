import React from 'react';
import parametric, { Props as PropsBase } from 'container/parametric';
import Status from 'component/status';
import Tile from 'component/tile';
import Value from 'component/value';
import { Line } from 'lib/element';
import { Unit } from 'lib/unit';
import Icon from 'icon/line.svg';

export { default as Icon } from 'icon/line.svg';

type Props = PropsBase<Line>;

export default parametric<Line>(
  ({ element: { kind, value: { y, z }, vi: [v, i] }, active, activate, remove, update }: Props) => (
    <Tile active={active} activate={activate} remove={remove} className={kind}>
      <Icon />
      <Value
        name={'y'}
        value={y}
        description={'propagation constant'}
        onChange={(y) => update({ y, z })}
      />
      <Value
        name={'z'}
        value={z}
        description={'characteristic impedance'}
        unit={Unit.ohm}
        onChange={(z) => update({ y, z })}
      />
      <Status value={v} unit={Unit.volt} />
      <Status value={i} unit={Unit.ampere} />
    </Tile>
  ),
);
