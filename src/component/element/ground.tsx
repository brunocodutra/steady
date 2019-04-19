import React from 'react';

import { Props as PropsBase } from 'component/element';
import Tile from 'component/tile';

import { Ground } from 'lib/element';

export const Icon = require('icon/ground.svg');

type Props = PropsBase<Ground>;

export default ({ element }: Props) => (
  <Tile className={element.kind}>
    <Icon />
  </Tile>
);
