import React from 'react';
import parametric, { Props as PropsBase } from 'container/parametric';
import Status from 'component/status';
import Tile from 'component/tile';
import Value from 'component/value';
import { ISrc } from 'lib/element';
import { Unit } from 'lib/unit';

export const Icon = require('icon/isrc.svg');

type Props = PropsBase<ISrc>;

export default parametric<ISrc>(
  ({ element: { kind, value, vi: [v, i] }, active, activate, remove, update }: Props) => (
    <Tile active={active} activate={activate} remove={remove} className={kind}>
      <Icon />
      <Value value={value} description={'current'} unit={Unit.ampere} onChange={update} />
      <Status value={v} unit={Unit.volt} />
      <Status value={i} unit={Unit.ampere} />
    </Tile>
  ),
);
