import * as React from 'react';
import {connect} from 'react-redux';

import {State} from 'state';

import removable, {Props as PropsBase} from 'container/removable';

import Element from 'component/element';
import Status from 'component/status';
import Tile from 'component/tile';

import {prefix} from 'lib/array';
import {Shunt} from 'lib/element';
import {sub} from 'lib/phasor';
import {project} from 'lib/quadripole';
import {Unit} from 'lib/unit';

const icon = (
  <svg viewBox={'0 0 3000 3000'}>
    <path d={'M0 667h3000M0 2333h3000M666.4443 667.00005L1703 3000M666 2333l296 667'}/>
    <circle fill={'currentColor'} r={60} cx={666} cy={666}/>
    <circle fill={'currentColor'} r={60} cx={666} cy={2333}/>
  </svg>
);

export const Icon = () => icon;

const wire = (
  <svg viewBox={'0 0 3000 3000'}>
    <path d={'M962 2v3000M1703 2v3000'}/>
  </svg>
);

const Wire = () => wire;

const knee = (
  <svg viewBox={'0 0 3000 3000'}>
    <path d={'M1704 0l297 665 999 1M965 0l1035 2333h1000'}/>
  </svg>
);

export const Knee = () => knee;

type Props = PropsBase<Shunt> & {
  readonly essential: boolean,
};

const mapState = ({active}: State, props: PropsBase<Shunt>) => ({
  essential: prefix(props.id, active),
});

export default removable<Shunt>(connect(mapState)(
  ({id, element, vi, active, activate, essential, remove}: Props): JSX.Element => {
    const fill = Array(element.level - element.value.level - 1).fill(0).map((_: 0, k: number) => <Wire key={k}/>);

    return (
      <Tile>
        <Tile activate={activate} active={active} remove={essential ? undefined : remove} className={element.kind}>
          <Icon/>
          {fill}
          <Knee/>
          <Status value={vi[0]} unit={Unit.volt}/>
          <Status value={vi[1]} unit={Unit.ampere}/>
        </Tile>
        <Element id={id} element={element.value} vi={[vi[0], sub(vi[1], project(element.model, vi)[1])]}/>
      </Tile>
    );
  },
));
