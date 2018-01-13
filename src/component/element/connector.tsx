import * as React from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import * as Actions from 'action';
import {State} from 'reducer';

import {Frame, Ring} from 'component/svg';
import Tile from 'component/tile';

import {equal} from 'lib/array';
import {Connector} from 'lib/element';
import {Phasor} from 'lib/phasor';

const icon = (
  <svg viewBox={'0 0 3000 3000'}>
    <Frame d={'M0 667l608-1M0 2333h608'}/>
    <Ring r={60} cx={666} cy={666}/>
    <Ring r={60} cx={666} cy={2333}/>
  </svg>
);

export const Icon = () => icon;

type PropsBase = {
  readonly id: number[],
  readonly element: Connector,
  readonly vi: [Phasor, Phasor],
};

type Props = PropsBase & {
  readonly active: boolean,
  readonly activate: () => void,
};

const mapState = ({schematics: {active}}: State, {id}: PropsBase) => ({
  active: equal(id, active),
});

const mapDispatch = (dispatch: Dispatch<Actions.Action>, {id}: PropsBase) => ({
  activate: () => {
    dispatch(Actions.activate(id));
  },
});

export default connect(mapState, mapDispatch)(
  ({element, active, activate}: Props) => (
    <Tile active={active} activate={activate} className={element.kind}>
      <Icon/>
    </Tile>
  ),
);
