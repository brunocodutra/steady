import * as React from 'react';

import parametric, {Props as PropsBase} from 'container/parametric';

import Tile from 'component/tile';
import Value from 'component/value';

import {ISrc} from 'lib/element';
import {Unit} from 'lib/unit';

const icon = (
  <svg viewBox={'0 0 3000 3000'}>
    <path d={'M0 667h3000m-1500 499V667M0 2333h3000m-1500 0v-500m0-104l-.5618-319'}/>
    <path fill={'currentColor'} d={'M1570 1410l-70-140-70 140z'}/>
    <circle r={333} cx={1500} cy={1500}/>
  </svg>
);

export const Icon = () => icon;

type Props = PropsBase<ISrc>;

export default parametric<ISrc>(
  ({element, active, activate, remove, update}: Props) => (
    <Tile active={active} activate={activate} remove={remove} className={element.kind}>
      <Icon/>
      <Value value={element.value} unit={Unit.ampere} onChange={update}/>
    </Tile>
  ),
);
