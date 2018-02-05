import * as React from 'react';

import parametric, {Props as PropsBase} from 'container/parametric';

import Status from 'component/status';
import Tile from 'component/tile';
import Value from 'component/value';

import {VSrc} from 'lib/element';
import {Unit} from 'lib/unit';

const icon = (
  <svg viewBox={'0 0 3000 3000'}>
    <path d={'M1277 666c223-333 223 333 446 0m149.2858-249.21516l167 .00002m-83.5 83.49998V333.28486'}/>
    <path d={'M0 667l1166-1M0 2333h3000M1833 666l1167 1'}/>
    <circle r={333} cx={1500} cy={666}/>
  </svg>
);

export const Icon = () => icon;

type Props = PropsBase<VSrc>;

export default parametric<VSrc>(
  ({vi: [v, i], element, active, activate, remove, update}: Props) => (
    <Tile active={active} activate={activate} remove={remove} className={element.kind}>
      <Icon/>
      <Value value={element.value} description={'voltage'} unit={Unit.volt} onChange={update}/>
      <Status value={v} unit={Unit.volt}/>
      <Status value={i} unit={Unit.ampere}/>
    </Tile>
  ),
);
