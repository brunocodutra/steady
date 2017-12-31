import * as React from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import * as Actions from 'action';
import {State} from 'reducer';

import Quantity from 'component/quantity';
import {Frame} from 'component/svg';
import Tile from 'component/tile';

import {Impedance} from 'lib/element';
import {Phasor} from 'lib/phasor';
import {Unit} from 'lib/unit';

const icon = (
  <svg viewBox={'0 0 3000 3000'}>
    <Frame d={'M0 667h1000M0 2333h3000M2000 667h1000m-1000 0v166H1000V500h1000v167z'}/>
  </svg>
);

export const Icon = () => icon;

type PropsBase = {
  readonly id: number[],
  readonly element: Impedance,
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
      <div className='value'>
        <Quantity value={element.value} unit={Unit.ohm}/>
      </div>
    </Tile>
  ),
);
