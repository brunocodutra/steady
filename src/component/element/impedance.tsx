import React from 'react';
import parametric, { Props as PropsBase } from 'container/parametric';
import Status from 'component/status';
import Tile from 'component/tile';
import Value from 'component/value';
import { Impedance } from 'lib/element';
import { Unit } from 'lib/unit';
import Icon from 'icon/impedance.svg';

export { default as Icon } from 'icon/impedance.svg';

type Props = PropsBase<Impedance>;

export default parametric<Impedance>(
  ({ element: { kind, value, vi: [v, i] }, active, activate, remove, update }: Props) => (
    <Tile active={active} activate={activate} remove={remove} className={kind}>
      <Icon />
      <Value value={value} description={'series impedance'} unit={Unit.ohm} onChange={update} />
      <Status value={v} unit={Unit.volt} />
      <Status value={i} unit={Unit.ampere} />
    </Tile>
  ),
);
