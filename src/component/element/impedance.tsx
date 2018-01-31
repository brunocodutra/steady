import * as React from 'react';

import parametric, {Props as PropsBase} from 'container/parametric';

import {Frame} from 'component/svg';
import Tile from 'component/tile';
import Value from 'component/value';

import {Impedance} from 'lib/element';
import {Unit} from 'lib/unit';

const icon = (
  <svg viewBox={'0 0 3000 3000'}>
    <Frame d={'M0 667h1000M0 2333h3000M2000 667h1000m-1000 0v166H1000V500h1000v167z'}/>
  </svg>
);

export const Icon = () => icon;

type Props = PropsBase<Impedance>;

export default parametric<Impedance>(
  ({element, active, activate, remove, update}: Props) => (
    <Tile active={active} activate={activate} remove={remove} className={element.kind}>
      <Icon/>
      <Value value={element.value} unit={Unit.ohm} onChange={update}/>
    </Tile>
  ),
);
