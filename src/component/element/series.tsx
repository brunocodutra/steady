import React from 'react';
import Element, { Props as PropsBase } from 'component/element';
import Tile from 'component/tile';
import { Series } from 'lib/element';
import { project } from 'lib/quadripole';
import { traverse } from 'lib/algorithm';

type Props = PropsBase<Series>;

export default ({ element: { kind, next }, id, vi }: Props): JSX.Element => (
  <Tile className={kind}>
    {traverse(next).map((e, i) => {
      const c = <Element id={[...id, i + 1]} element={e} vi={vi} key={i} />;
      vi = project(e.model, vi);
      return c;
    })}
  </Tile>
);
