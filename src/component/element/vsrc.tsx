import * as React from 'react';

import parametric, {Props as PropsBase} from 'container/parametric';

import Quantity from 'component/quantity';
import {Frame, Ring} from 'component/svg';
import Tile from 'component/tile';

import {VSrc} from 'lib/element';
import {Unit} from 'lib/unit';

const icon = (
  <svg viewBox={'0 0 3000 3000'}>
    <Frame d={'M1277 666c223-333 223 333 446 0m149.2858-249.21516l167 .00002m-83.5 83.49998V333.28486'}/>
    <Frame d={'M0 667l1166-1M0 2333h3000M1833 666l1167 1'}/>
    <Ring r={333} cx={1500} cy={666}/>
  </svg>
);

export const Icon = () => icon;

type Props = PropsBase<VSrc>;

export default parametric<VSrc>(
  ({element, active, activate, remove}: Props) => (
    <Tile active={active} activate={activate} remove={remove} className={element.kind}>
      <Icon/>
      <span className='value'>
        <Quantity value={element.value} unit={Unit.volt}/>
      </span>
    </Tile>
  ),
);
