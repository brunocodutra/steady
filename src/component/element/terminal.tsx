import React from 'react';
import activable, { Props as PropsBase } from 'container/activable';
import Tile from 'component/tile';
import { Terminal } from 'lib/element';
import Icon from 'icon/terminal.svg';

export { default as Icon } from 'icon/terminal.svg';

type Props = PropsBase<Terminal>;

export default activable<Terminal>(
  ({ element: { kind }, active, activate }: Props) => (
    <Tile active={active} activate={activate} className={kind}>
      <Icon />
    </Tile>
  ),
);
