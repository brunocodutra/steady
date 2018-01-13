import * as React from 'react';

import removable, {Props as PropsBase} from 'container/removable';

import Quantity from 'component/quantity';
import {Frame} from 'component/svg';
import Tile from 'component/tile';

import {Admittance} from 'lib/element';
import {Unit} from 'lib/unit';

const icon = (
  <svg viewBox={'0 0 3000 3000'}>
    <Frame d={'M0 667h3000m-1500 333V667M0 2333h3000m-1500-333h-167V1000h333v1000h-166zm0 333v-333'}/>
  </svg>
);

export const Icon = () => icon;

type Props = PropsBase & {
  readonly element: Admittance,
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
