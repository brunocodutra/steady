import React from 'react';
import { connect } from 'react-redux';
import { State } from 'state';
import removable, { Props as PropsBase } from 'container/removable';
import Element from 'component/element';
import Status from 'component/status';
import Tile from 'component/tile';
import { Shunt } from 'lib/element';
import { Unit } from 'lib/unit';
import { prefix } from 'lib/util';

export const Icon = require('icon/shunt.svg');
const Wire = require('icon/wire.svg');
const Knee = require('icon/knee.svg');

interface Props extends PropsBase<Shunt> {
  readonly essential: boolean,
}

const mapState = ({ active }: State, props: PropsBase<Shunt>) => ({
  essential: prefix(props.id, active),
});

export default removable<Shunt>(connect(mapState)(
  ({ id, element: { kind, branch, level, vi: [v, i] }, active, activate, essential, remove }: Props): JSX.Element => {
    const fill = Array(level - branch.level - 1).fill(0).map((_: 0, k: number) => <Wire key={k} />);

    return (
      <Tile>
        <Tile activate={activate} active={active} remove={essential ? undefined : remove} className={kind}>
          <Icon />
          {fill}
          <Knee />
          <Status value={v} unit={Unit.volt} />
          <Status value={i} unit={Unit.ampere} />
        </Tile>
        <Element id={id} element={branch} />
      </Tile>
    );
  },
));
