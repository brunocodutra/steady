import * as React from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';

import * as Actions from 'action';
import {State} from 'reducer';

import Element from 'component/element';
import {Disk, Frame} from 'component/svg';
import Tile from 'component/tile';

import {Shunt} from 'lib/element';
import {Phasor, sub} from 'lib/phasor';
import {project} from 'lib/quadripole';

const icon = (
  <svg viewBox={'0 0 3000 3000'}>
    <Frame d={'M0 667h3000M0 2333h3000M666.4443 667.00005L1703 3000M666 2333l296 667'}/>
    <Disk r={60} cx={666} cy={666}/>
    <Disk r={60} cx={666} cy={2333}/>
  </svg>
);

export const Icon = () => icon;

const wire = (
  <svg viewBox={'0 0 3000 3000'}>
    <Frame d={'M962 2v3000M1703 2v3000'}/>
  </svg>
);

const Wire = () => wire;

const knee = (
  <svg viewBox={'0 0 3000 3000'}>
    <Frame d={'M1704 0l297 665 999 1M965 0l1035 2333h1000'}/>
  </svg>
);

export const Knee = () => knee;

type PropsBase = {
  readonly id: number[],
  readonly element: Shunt,
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
  ({id, element, vi, active, activate}: Props): JSX.Element => {
    const fill = Array.apply(null, Array(element.height - element.value.height - 1))
      .map((_: undefined, k: number) => <Wire key={k}/>);

    return (
      <Tile>
        <Tile activate={activate} active={active} className={element.kind}>
          <Icon/>
          {fill}
          <Knee/>
        </Tile>
        <Element id={id} element={element.value} vi={[vi[0], sub(vi[1], project(element.model, vi)[1])]}/>
      </Tile>
    );
  },
);
