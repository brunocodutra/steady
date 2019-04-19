import React from 'react';

import Element, { Props as PropsBase } from 'component/element';
import Tile from 'component/tile';

import { Element as ElementT, Series } from 'lib/element';
import { project } from 'lib/quadripole';

type Props = PropsBase<Series>;

const traverse = ({ next }: ElementT): ElementT[] => next ? [next, ...traverse(next)] : [];

export default ({ element, id, vi }: Props): JSX.Element => (
  <Tile className={element.kind}>
    {traverse(element).map((e, i) => {
      const c = <Element id={[...id, i + 1]} element={e} vi={vi} key={i} />;
      vi = project(e.model, vi);
      return c;
    })}
  </Tile>
);
