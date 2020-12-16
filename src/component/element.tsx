import React from 'react';
import { Element, Energized, Kind } from 'lib/element';
import Admittance from 'component/element/admittance';
import Terminal from 'component/element/terminal';
import Ground from 'component/element/ground';
import Impedance from 'component/element/impedance';
import ISrc from 'component/element/isrc';
import Line from 'component/element/line';
import Series from 'component/element/series';
import Shunt from 'component/element/shunt';
import VSrc from 'component/element/vsrc';
import XFormer from 'component/element/xformer';

export interface Props<E extends Element = Element> {
  readonly id: number[],
  readonly element: Energized<E>,
}

export default ({ id, element }: Props): JSX.Element => {
  switch (element.kind) {
    case Kind.ground:
      return <Ground id={id} element={element} />;

    case Kind.terminal:
      return <Terminal id={id} element={element} />;

    case Kind.vsrc:
      return <VSrc id={id} element={element} />;

    case Kind.isrc:
      return <ISrc id={id} element={element} />;

    case Kind.impedance:
      return <Impedance id={id} element={element} />;

    case Kind.admittance:
      return <Admittance id={id} element={element} />;

    case Kind.xformer:
      return <XFormer id={id} element={element} />;

    case Kind.line:
      return <Line id={id} element={element} />;

    case Kind.series:
      return <Series id={id} element={element} />;

    case Kind.shunt:
      return <Shunt id={id} element={element} />;
  }
};
