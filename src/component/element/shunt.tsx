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
import Wire from 'icon/wire.svg';
import Knee from 'icon/knee.svg';
import Icon from 'icon/shunt.svg';

export { default as Icon } from 'icon/shunt.svg';

interface Props extends PropsBase<Shunt> {
  readonly essential: boolean,
}

const mapState = ({ active }: State, props: PropsBase<Shunt>) => ({
  essential: prefix(props.id, active),
});

export default removable<Shunt>(connect(mapState)(
  ({ id, element: { kind, branch, subcircuits, vi: [v, i] }, active, activate, essential, remove }: Props): JSX.Element => {
    const fill = Array.from({ length: subcircuits - branch.subcircuits - 1 }, (_, k) => <Wire key={k} />);

    return (
      <Tile>
        <Tile activate={activate} active={active} remove={essential ? undefined : remove} className={kind}>
          <Icon />
          {fill}
          <Knee />
          <Status value={v} unit={Unit.volt} />
          <Status value={i} unit={Unit.ampere} />
        </Tile>
        <Tile className={'branch'}>
          <Element id={id} element={branch} />
        </Tile>
      </Tile>
    );
  },
));
