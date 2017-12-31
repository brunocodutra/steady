import * as React from 'react';

import {Frame} from 'component/svg';
import Tile from 'component/tile';

import {Knee} from 'lib/element';
import {Phasor} from 'lib/phasor';

const icon = (
  <svg viewBox={'0 0 3000 3000'}>
    <Frame d={'M1704 0l297 665 999 1M965 0l1035 2333h1000'}/>
  </svg>
);

export const Icon = () => icon;

type Props = {
  readonly id: number[],
  readonly element: Knee,
  readonly vi: [Phasor, Phasor],
};

export default ({element}: Props) => (
  <Tile className={element.kind}>
    <Icon/>
  </Tile>
);
