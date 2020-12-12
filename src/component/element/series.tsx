import React from 'react';
import Element, { Props as PropsBase } from 'component/element';
import Tile from 'component/tile';
import { Series } from 'lib/element';
import { traverse } from 'lib/util';

type Props = PropsBase<Series>;

export default ({ element: { kind, next }, id }: Props): JSX.Element => (
  <Tile className={kind}>
    {traverse(next).map((e, i) => <Element id={[...id, i + 1]} element={e} key={i} />)}
  </Tile>
);
