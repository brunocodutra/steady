import * as React from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import * as Actions from 'action';
import {State} from 'reducer';

import Quantity from 'component/quantity';
import {Frame, Ring, Shape} from 'component/svg';
import Tile from 'component/tile';

import {equal} from 'lib/array';
import {ISrc} from 'lib/element';
import {Phasor} from 'lib/phasor';
import {Unit} from 'lib/unit';

const icon = (
  <svg viewBox={'0 0 3000 3000'}>
    <Frame d={'M0 667h3000m-1500 499V667M0 2333h3000m-1500 0v-500m0-104l-.5618-319'}/>
    <Shape d={'M1570 1410l-70-140-70 140z'}/>
    <Ring r={333} cx={1500} cy={1500}/>
  </svg>
);

export const Icon = () => icon;

type PropsBase = {
  readonly id: number[],
  readonly element: ISrc,
  readonly vi: [Phasor, Phasor],
};

type Props = PropsBase & {
  readonly active: boolean,
  readonly activate: () => void,
  readonly remove: () => void,
};

const mapState = ({schematics: {active}}: State, {id}: PropsBase) => ({
  active: equal(id, active),
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
        <Quantity value={element.value} unit={Unit.ampere}/>
      </span>
    </Tile>
  ),
);
