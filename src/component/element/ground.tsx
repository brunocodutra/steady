import * as React from 'react';

import {Frame} from 'component/svg';
import Tile from 'component/tile';

import {Ground} from 'lib/element';
import {Phasor} from 'lib/phasor';

const icon = (
  <svg viewBox={'0 0 3000 3000'}>
    <Frame d={'M1500 2666v-333m-334 333h667m-567 111h478m-412 111h334m1334-555H1500V666h1500'}/>
  </svg>
);

export const Icon = () => icon;

type Props = {
  readonly id: number[],
  readonly element: Ground,
  readonly vi: [Phasor, Phasor],
};

export default ({element}: Props) => (
  <Tile className={element.kind}>
    <Icon/>
  </Tile>
);
