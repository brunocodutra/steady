import * as React from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import * as Actions from 'action';
import {State} from 'reducer';

import Quantity from 'component/quantity';
import {Frame, Ring} from 'component/svg';
import Tile from 'component/tile';

import {VSrc} from 'lib/element';
import {Phasor} from 'lib/phasor';
import {Unit} from 'lib/unit';

const icon = (
  <svg viewBox={'0 0 3000 3000'}>
    <Frame d={'M1277 666c223-333 223 333 446 0m149.2858-249.21516l167 .00002m-83.5 83.49998V333.28486'}/>
    <Frame d={'M0 667l1166-1M0 2333h3000M1833 666l1167 1'}/>
    <Ring r={333} cx={1500} cy={666}/>
  </svg>
);

export const Icon = () => icon;

type PropsBase = {
  readonly id: number[],
  readonly element: VSrc,
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
        <Quantity value={element.value} unit={Unit.volt}/>
      </span>
    </Tile>
  ),
);
