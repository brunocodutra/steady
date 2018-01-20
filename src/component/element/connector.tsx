import * as React from 'react';

import activable, {Props as PropsBase} from 'container/activable';

import {Frame, Ring} from 'component/svg';
import Tile from 'component/tile';

import {Connector} from 'lib/element';

const icon = (
  <svg viewBox={'0 0 3000 3000'}>
    <Frame d={'M0 667l608-1M0 2333h608'}/>
    <Ring r={60} cx={666} cy={666}/>
    <Ring r={60} cx={666} cy={2333}/>
  </svg>
);

export const Icon = () => icon;

type Props = PropsBase<Connector>;

export default activable<Connector>(
  ({element, active, activate}: Props) => (
    <Tile active={active} activate={activate} className={element.kind}>
      <Icon/>
    </Tile>
  ),
);
