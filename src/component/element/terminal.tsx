import React from 'react';
import activable, { Props as PropsBase } from 'container/activable';
import Tile from 'component/tile';
import { Terminal } from 'lib/element';

export const Icon = require('icon/terminal.svg');

type Props = PropsBase<Terminal>;

export default activable<Terminal>(
  ({ element: { kind }, active, activate }: Props) => (
    <Tile active={active} activate={activate} className={kind}>
      <Icon />
    </Tile>
  ),
);
