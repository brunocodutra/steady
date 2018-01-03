import * as React from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import * as Actions from 'action';
import {State} from 'reducer';

import Quantity from 'component/quantity';
import {Frame} from 'component/svg';
import Tile from 'component/tile';

import {Admittance} from 'lib/element';
import {Phasor} from 'lib/phasor';
import {Unit} from 'lib/unit';

const icon = (
  <svg viewBox={'0 0 3000 3000'}>
    <Frame d={'M0 667h3000m-1500 333V667M0 2333h3000m-1500-333h-167V1000h333v1000h-166zm0 333v-333'}/>
  </svg>
);

export const Icon = () => icon;

type PropsBase = {
  readonly id: number[],
  readonly element: Admittance,
  readonly vi: [Phasor, Phasor],
};

type Props = PropsBase & {
  readonly active: boolean,
  readonly activate: () => void,
};

const mapState = ({schematics: {active}}: State, {id}: PropsBase) => ({
  active: JSON.stringify(active) === JSON.stringify(id),
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
        <Quantity value={element.value} unit={Unit.ohm}/>
      </span>
    </Tile>
  ),
);
