import * as React from 'react';

import Element from 'component/element';

import {Element as ElementT, Series} from 'lib/element';
import {Phasor} from 'lib/phasor';
import {project} from 'lib/quadripole';

type Props = {
  readonly id: number[],
  readonly element: Series,
  readonly vi: [Phasor, Phasor],
};

const traverse = ({next}: ElementT): ElementT[] => next ? [next, ...traverse(next)] : [];

export default ({element, id, vi}: Props): JSX.Element => (
  <>
    {traverse(element).map((e, i) => {
      const c = <Element id={[...id, i + 1]} element={e} vi={vi} key={i}/>;
      vi = project(element.model, vi);
      return c;
    })}
  </>
);
