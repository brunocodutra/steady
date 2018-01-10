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
  readonly remove: () => void,
};

const mapState = ({schematics: {active}}: State, {id}: PropsBase) => ({
  active: active.length === id.length && id.every((x, i) => x === active[i]),
});

const mapDispatch = (dispatch: Dispatch<Actions.Action>, {id}: PropsBase) => ({
  activate: () => {
    dispatch(Actions.activate(id));
  },

  remove: () => {
    dispatch(Actions.remove(id));
  },
});

export default connect(mapState, mapDispatch)(
  ({element, active, activate, remove}: Props) => (
    <Tile active={active} activate={activate} remove={remove} className={element.kind}>
      <Icon/>
      <span className='value'>
        <Quantity value={element.value} unit={Unit.ohm}/>
      </span>
    </Tile>
  ),
);
