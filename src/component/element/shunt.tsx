import * as React from 'react';
import {connect} from 'react-redux';

import {State} from 'reducer';

import removable, {Props as PropsBase} from 'container/removable';

import Element from 'component/element';
import {Disk, Frame} from 'component/svg';
import Tile from 'component/tile';

import {prefix} from 'lib/array';
import {Shunt} from 'lib/element';
import {sub} from 'lib/phasor';
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

type Props = PropsBase & {
  readonly element: Shunt,
  readonly essential: boolean,
};

const mapState = ({schematics: {active}}: State, props: PropsBase) => ({
  essential: prefix(props.id, active),
});

export default removable(connect(mapState)(
  ({id, element, vi, active, activate, essential, remove}: Props): JSX.Element => {
    const fill = Array(element.level - element.value.level - 1).fill(0).map((_: 0, k: number) => <Wire key={k}/>);

    return (
      <Tile>
        <Tile activate={activate} active={active} remove={essential ? undefined : remove} className={element.kind}>
          <Icon/>
          {fill}
          <Knee/>
        </Tile>
        <Element id={id} element={element.value} vi={[vi[0], sub(vi[1], project(element.model, vi)[1])]}/>
      </Tile>
    );
  },
));
