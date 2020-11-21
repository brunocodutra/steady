import React from 'react';
import activable, { Props as PropsBase } from 'container/activable';
import Tile from 'component/tile';
import { Connector } from 'lib/element';

export const Icon = require('icon/connector.svg');

type Props = PropsBase<Connector>;

export default activable<Connector>(
  ({ element: { kind }, active, activate }: Props) => (
    <Tile active={active} activate={activate} className={kind}>
      <Icon />
    </Tile>
  ),
);
