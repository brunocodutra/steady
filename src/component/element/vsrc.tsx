import React from 'react';

import parametric, { Props as PropsBase } from 'container/parametric';

import Status from 'component/status';
import Tile from 'component/tile';
import Value from 'component/value';

import { VSrc } from 'lib/element';
import { Unit } from 'lib/unit';

export const Icon = require('icon/vsrc.svg');

type Props = PropsBase<VSrc>;

export default parametric<VSrc>(
  ({ vi: [v, i], element, active, activate, remove, update }: Props) => (
    <Tile active={active} activate={activate} remove={remove} className={element.kind}>
      <Icon />
      <Value value={element.value} description={'voltage'} unit={Unit.volt} onChange={update} />
      <Status value={v} unit={Unit.volt} />
      <Status value={i} unit={Unit.ampere} />
    </Tile>
  ),
);
