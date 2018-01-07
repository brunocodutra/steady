import * as React from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import * as Actions from 'action';
import {State} from 'reducer';

import Quantity from 'component/quantity';
import {Frame} from 'component/svg';
import Tile from 'component/tile';

import {Line} from 'lib/element';
import {Phasor} from 'lib/phasor';
import {Unit} from 'lib/unit';

const frame = '\
M0 2334h333v-667.0001h260M0 667h333v667h260m2407 1000h-334v-667h-180.7802M3000 \
667h-334v667h-171.9096 \
';

const icon = (
  <svg viewBox={'0 0 3000 3000'}>
    <Frame d={frame}/>
    <Frame d={'M612 1834h1776c161.3381-88.2682 154.5316-653.6022 0-668H612'}/>
    <Frame d={'M612 1834c162.20831-88.2242 153.883-653.8787 0-668-160.09707 88.5162-153.33687 653.7921 0 668z'}/>
  </svg>
);

export const Icon = () => icon;

type PropsBase = {
  readonly id: number[],
  readonly element: Line,
  readonly vi: [Phasor, Phasor],
};

type Props = PropsBase & {
  readonly active: boolean,
  readonly activate: () => void,
};

const mapState = ({schematics: {active}}: State, {id}: PropsBase) => ({
  active: active.length === id.length && active.every((x, i) => x === id[i]),
});

const mapDispatch = (dispatch: Dispatch<Actions.Action>, props: PropsBase) => ({
  activate: () => {
    dispatch(Actions.activate(props.id));
  },
});

export default connect(mapState, mapDispatch)(
  ({element, active, activate}: Props) => (
    <Tile active={active} activate={activate} className={element.kind}>
      <Icon/>
      <span className='value'>
        <span>
          <span>γ</span>
          <span>Z</span>
        </span>
        <span>
          <span>=</span>
          <span>=</span>
        </span>
        <span>
          <Quantity value={element.value.y} unit={Unit.constant}/>
          <Quantity value={element.value.z} unit={Unit.ohm}/>
        </span>
      </span>
    </Tile>
  ),
);
