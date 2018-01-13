import * as React from 'react';

import removable, {Props as PropsBase} from 'container/removable';

import Quantity from 'component/quantity';
import {Frame} from 'component/svg';
import Tile from 'component/tile';

import {Impedance} from 'lib/element';
import {Unit} from 'lib/unit';

const icon = (
  <svg viewBox={'0 0 3000 3000'}>
    <Frame d={'M0 667h1000M0 2333h3000M2000 667h1000m-1000 0v166H1000V500h1000v167z'}/>
  </svg>
);

export const Icon = () => icon;

type Props = PropsBase & {
  readonly element: Impedance,
};

export default removable(
  ({element, active, activate, remove}: Props) => (
    <Tile active={active} activate={activate} remove={remove} className={element.kind}>
      <Icon/>
      <span className='value'>
        <Quantity value={element.value} unit={Unit.ohm}/>
      </span>
    </Tile>
  ),
);
