import * as React from 'react';

import parametric, {Props as PropsBase} from 'container/parametric';

import Tile from 'component/tile';
import Value from 'component/value';

import {Line} from 'lib/element';
import {Unit} from 'lib/unit';

const frame = '\
M0 2334h333v-667.0001h260M0 667h333v667h260m2407 1000h-334v-667h-180.7802M3000 \
667h-334v667h-171.9096 \
';

const icon = (
  <svg viewBox={'0 0 3000 3000'}>
    <path d={frame}/>
    <path d={'M612 1834h1776c161.3381-88.2682 154.5316-653.6022 0-668H612'}/>
    <path d={'M612 1834c162.20831-88.2242 153.883-653.8787 0-668-160.09707 88.5162-153.33687 653.7921 0 668z'}/>
  </svg>
);

export const Icon = () => icon;

type Props = PropsBase<Line>;

export default parametric<Line>(
  ({element, active, activate, remove, update}: Props) => (
    <Tile active={active} activate={activate} remove={remove} className={element.kind}>
      <Icon/>
      <Value name={'y'} value={element.value.y} unit={Unit.constant} onChange={(y) => update({...element.value, y})}/>
      <Value name={'z'} value={element.value.z} unit={Unit.ohm} onChange={(z) => update({...element.value, z})}/>
    </Tile>
  ),
);
