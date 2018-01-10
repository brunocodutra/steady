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

type StateProps = {
  readonly active: boolean,
  readonly essential: boolean,
};

type DispatchProps = {
  readonly activate: () => void,
  readonly remove: () => void,
};

type Props =
  & PropsBase
  & Pick<StateProps, 'active'>
  & Pick<DispatchProps, 'activate'>
  & Partial<Pick<DispatchProps, 'remove'>>
;

const mapState = ({schematics: {active}}: State, {id}: PropsBase): StateProps => {
  const essential = active.length >= id.length && id.every((x, i) => x === active[i]);
  return {
    active: active.length === id.length && essential,
    essential,
  };
};

const mapDispatch = (dispatch: Dispatch<Actions.Action>, {id}: PropsBase): DispatchProps => ({
  activate: () => {
    dispatch(Actions.activate(id));
  },

  remove: () => {
    dispatch(Actions.remove(id));
  },
});

const mergeProps = ({active, essential}: StateProps, {activate, remove}: DispatchProps, base: PropsBase): Props => ({
  ...base,
  active,
  activate,
  remove: essential ? undefined : remove,
});

export default connect(mapState, mapDispatch, mergeProps)(
  ({id, element, vi, active, activate, remove}: Props): JSX.Element => {
    const fill = Array(element.level - element.value.level - 1).fill(0).map((_: 0, k: number) => <Wire key={k}/>);

    return (
      <Tile>
        <Tile activate={activate} active={active} remove={remove} className={element.kind}>
          <Icon/>
          {fill}
          <Knee/>
        </Tile>
        <Element id={id} element={element.value} vi={[vi[0], sub(vi[1], project(element.model, vi)[1])]}/>
      </Tile>
    );
  },
);
