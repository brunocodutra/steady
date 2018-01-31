import * as React from 'react';

import parametric, {Props as PropsBase} from 'container/parametric';

import Tile from 'component/tile';
import Value from 'component/value';

import {Admittance} from 'lib/element';
import {Unit} from 'lib/unit';

const icon = (
  <svg viewBox={'0 0 3000 3000'}>
    <path d={'M0 667h3000m-1500 333V667M0 2333h3000m-1500-333h-167V1000h333v1000h-166zm0 333v-333'}/>
  </svg>
);

export const Icon = () => icon;

type Props = PropsBase<Admittance>;

export default parametric<Admittance>(
  ({element, active, activate, remove, update}: Props) => (
    <Tile active={active} activate={activate} remove={remove} className={element.kind}>
      <Icon/>
      <Value value={element.value} unit={Unit.ohm} onChange={update}/>
    </Tile>
  ),
);
