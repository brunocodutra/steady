import React from 'react';
import { connect } from 'react-redux';

import { State } from 'state';

import removable, { Props as PropsBase } from 'container/removable';

import Element from 'component/element';
import Status from 'component/status';
import Tile from 'component/tile';

import { prefix } from 'lib/array';
import { Shunt } from 'lib/element';
import { sub } from 'lib/phasor';
import { project } from 'lib/quadripole';
import { Unit } from 'lib/unit';

export const Icon = require('icon/shunt.svg');
const Wire = require('icon/wire.svg');
const Knee = require('icon/knee.svg');

type Props = PropsBase<Shunt> & {
  readonly essential: boolean,
};

const mapState = ({ active }: State, props: PropsBase<Shunt>) => ({
  essential: prefix(props.id, active),
});

export default removable<Shunt>(connect(mapState)(
  ({ id, element, vi, active, activate, essential, remove }: Props): JSX.Element => {
    const fill = Array(element.level - element.value.level - 1).fill(0).map((_: 0, k: number) => <Wire key={k} />);

    return (
      <Tile>
        <Tile activate={activate} active={active} remove={essential ? undefined : remove} className={element.kind}>
          <Icon />
          {fill}
          <Knee />
          <Status value={vi[0]} unit={Unit.volt} />
          <Status value={vi[1]} unit={Unit.ampere} />
        </Tile>
        <Element id={id} element={element.value} vi={[vi[0], sub(vi[1], project(element.model, vi)[1])]} />
      </Tile>
    );
  },
));
