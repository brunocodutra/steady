import React from 'react';
import { Element, Powered, Kind } from 'lib/element';
import Admittance from 'component/element/admittance';
import Terminal from 'component/element/terminal';
import Ground from 'component/element/ground';
import Impedance from 'component/element/impedance';
import ISrc from 'component/element/isrc';
import Line from 'component/element/line';
import Shunt from 'component/element/shunt';
import VSrc from 'component/element/vsrc';
import XFormer from 'component/element/xformer';
import { traverse } from 'lib/util';

export interface Props<E extends Element = Element> {
  readonly id: number[],
  readonly element: Powered<E>,
}

export default ({ id, element }: Props): JSX.Element => (
  <>
    {traverse(element).map((e, i) => {
      switch (e.kind) {
        case Kind.ground:
          return <Ground id={[...id, i]} element={e} key={i} />;

        case Kind.terminal:
          return <Terminal id={[...id, i]} element={e} key={i} />;

        case Kind.vsrc:
          return <VSrc id={[...id, i]} element={e} key={i} />;

        case Kind.isrc:
          return <ISrc id={[...id, i]} element={e} key={i} />;

        case Kind.impedance:
          return <Impedance id={[...id, i]} element={e} key={i} />;

        case Kind.admittance:
          return <Admittance id={[...id, i]} element={e} key={i} />;

        case Kind.xformer:
          return <XFormer id={[...id, i]} element={e} key={i} />;

        case Kind.line:
          return <Line id={[...id, i]} element={e} key={i} />;

        case Kind.shunt:
          return <Shunt id={[...id, i]} element={e} key={i} />;
      }
    })}
  </>
);
